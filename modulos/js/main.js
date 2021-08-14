// --- Incrementos margenes
var incrementoMarginLeft = 0; // Movimiento derecha
var incrementoMarginRight = 0; // Movimiento izquierda
var incrementoMarginTop = 0; // Movimiento abajo
var incrementoMarginBottom = 0; // Movimiento arriba

var movimientoDerecha = true;
var movimientoIzquierda = false;
var movimientoArriba = false;
var movimientoAbajo = false;

var totalPuntos = 0;

// -- Contenedor puntos
var contenedorPuntos = document.getElementById("totalPuntos");
// -- Cabeza culebrita
var cabezaCulebrita = document.getElementById("cabeza");
// -- Partes culebrita
var arrayPartesCulebrita = document.getElementsByClassName("parteTraseraCulebrita");
// -- Parte principal
var partePrincipalCulebrita = document.getElementsByClassName("culebritaPrincipal")[0];

var contadorPixelesAvanzoCabezaCulebrita = 0;
var indexPartesCulebrita = 0;

// ----Nuevas variables
var incrementoMarginLeftMovimientoAbajo = 1;

// --- Se inicializa culebrita.
comenzarJuego(100);
function comenzarJuego( velocidad ) {

    var id = setInterval(function(){
        
        var estadoJuego = moverCulebrita();
    
        // --- Si chocó se reinicia la posición inicial de la culebrita.
        if ( estadoJuego == 'choco' ) {

            var incrementoPartesCulebrita = 0;
            var arrayAllPartesCulebrita = document.getElementsByClassName("culebrita");
            for (var parteCulebrita of arrayAllPartesCulebrita) {
                console.log(parteCulebrita);
                parteCulebrita.style.marginLeft = incrementoPartesCulebrita+"px";
                incrementoPartesCulebrita += 30;
            }
            
            incrementoMarginLeft = 0;
            totalPuntos = 0;
            contenedorPuntos.innerHTML = totalPuntos;
        }

        if ( incrementoMarginTop == 650 ) {
            clearInterval(id);
        }

    }, velocidad);

}

// --- Contról de movimientos.
var contenedorPrincipal = document.getElementsByTagName("body");
contenedorPrincipal[0].onkeyup = function(evt) {

    // Se obtiene el identificador de la tecla presionada y soltada.
    var moverHacia = evt.key;
    // console.log(moverHacia);

    switch( moverHacia ) {

        // Margin bottom, mover hacia arriba
        case "ArrowUp":
            movimientoDerecha = false;
            movimientoIzquierda = false;
            movimientoArriba = true;
            movimientoAbajo = false;
        return;

        // Margin top, mover hacia bajo
        case "ArrowDown":
            movimientoDerecha = false;
            movimientoIzquierda = false;
            movimientoArriba = false;
            movimientoAbajo = true;
        return;

        // Margin right, mover hacia la izquierda
        case "ArrowLeft":
            movimientoDerecha = false;
            movimientoIzquierda = true;
            movimientoArriba = false;
            movimientoAbajo = false;
        return;

        // Margin left, mover hacia la derecha
        case "ArrowRight":
            movimientoDerecha = true;
            movimientoIzquierda = false;
            movimientoArriba = false;
            movimientoAbajo = false;
        return;

    }
    
};


// --- Función para mover la culebrita con las propiedad margin-left y margin-right.
function moverCulebrita() {

    var arrayCulebrita = document.getElementsByClassName("culebrita");

    // ---Elemento culebrita, cabeza.
    var culebritaAuxiliar = arrayCulebrita[arrayCulebrita.length-1];

    // ----- Se obtienen los estilos que están precargados en la hoja de estilos.
    var estiloPrimeraCarga = culebritaAuxiliar.ownerDocument.styleSheets[0].cssRules[5].style;

    // -- Margin left, primera carga.
    var marginLeft = estiloPrimeraCarga.marginLeft;

    // -- Se genera el array de la propiedad left (coordenada X).
    var arrayCoordenadaX = marginLeft.split("");
    // -- Se quita la unidad de medida (px, em o cualquier otra que tenga longitud 2).
    arrayCoordenadaX.splice(arrayCoordenadaX.length - 2, arrayCoordenadaX.length - 1);
    var marginLeftAuxiliar = "";
    for (var numero of arrayCoordenadaX ) { 
        marginLeftAuxiliar += numero; 
    }

    // -- Margin top, primera carga.
    var marginTop = estiloPrimeraCarga.marginTop;

    // -- Se genera el array de la propiedad left (coordenada X).
    var arrayCoordenadaY = marginTop.split("");
    // -- Se quita la unidad de medida (px, em o cualquier otra que tenga longitud 2).
    arrayCoordenadaY.splice(arrayCoordenadaY.length - 2, arrayCoordenadaY.length - 1);
    var marginTopAuxiliar = "";
    for (var numero of arrayCoordenadaY ) { 
        marginTopAuxiliar += numero; 
    }

    /////////////////////////MOVIMIENTIOS/////////////////////////

    // --- Movimiento hacia la derecha
    if ( movimientoDerecha ) {

        if ( incrementoMarginLeft == 0 ) {
            incrementoMarginLeft = marginLeftAuxiliar;
        }
        
        // --- Incremento pixeles a la izquierda.
        incrementoMarginLeft++;

        // console.log(incrementoMarginLeft);

        // --- Si la culebrita llega a la posición mayor a 1170px pierde y se vuelve a inicializar.
        if ( incrementoMarginLeft > 1170 ) {

            empezarDeNuevo(arrayCulebrita);
            return 'choco';

        } else {

            moverCabezaCulebrita(culebritaAuxiliar);
            moverPartesCulebritaDerecha();
            // moverPartesCulebritaDerechaAbajo();
            
            if ( contadorPixelesAvanzoCabezaCulebrita == 30 ) {
                
                contadorPixelesAvanzoCabezaCulebrita = 0;
                
            } contadorPixelesAvanzoCabezaCulebrita++;

            cabezaCulebrita.style.transform = "rotate("+180+"deg)";
            cabezaCulebrita.style.marginTop = 10+"px";
            cabezaCulebrita.style.marginLeft = 10+"px";

            var objetoCalcularSumatoriaCoordenadasComida= calcularSumatoriaCoordenadasComida();
            var sumatoriaCoordenadasComida = objetoCalcularSumatoriaCoordenadasComida.sumatoriaCoordenadasComida;
            var coordenadaComidaX = objetoCalcularSumatoriaCoordenadasComida.coordenadaComidaX;
            var coordenadaComidaY = objetoCalcularSumatoriaCoordenadasComida.coordenadaComidaY;

            var objetoCalcularSumatoriaCoordenadasCulebrita = calcularSumatoriaCoordenadasCulebrita();
            var sumatoriaCoordenadasCulebrita = objetoCalcularSumatoriaCoordenadasCulebrita.sumatoriaCoordenadasCulebrita;
            var coordenadaCulebritaX = objetoCalcularSumatoriaCoordenadasCulebrita.coordenadaCulebritaX;
            var coordenadaCulebritaY = objetoCalcularSumatoriaCoordenadasCulebrita.coordenadaCulebritaY;
        }

        // console.log( "derecha", incrementoMarginLeft, movimientoDerecha );
    }


    // --- Movimiento hacia la izquierda
    if ( movimientoIzquierda ) {

        // --- Decrementar pixeles a la izquierda.
        incrementoMarginLeft--;

        // --- Si la culebrita llega a la posición <= 0px pierde y se vuelve a inicializar.
        if ( incrementoMarginLeft < 0 ) {

            empezarDeNuevo(arrayCulebrita);
            return 'choco';

        }else {

            moverCabezaCulebrita(culebritaAuxiliar);
            
            cabezaCulebrita.style.transform = "rotate("+180+"deg)";
            cabezaCulebrita.style.marginTop = 10+"px";
            cabezaCulebrita.style.marginLeft = -10+"px";

            var objetoCalcularSumatoriaCoordenadasComida= calcularSumatoriaCoordenadasComida();
            var sumatoriaCoordenadasComida = objetoCalcularSumatoriaCoordenadasComida.sumatoriaCoordenadasComida;
            var coordenadaComidaX = objetoCalcularSumatoriaCoordenadasComida.coordenadaComidaX;
            var coordenadaComidaY = objetoCalcularSumatoriaCoordenadasComida.coordenadaComidaY;

            var objetoCalcularSumatoriaCoordenadasCulebrita = calcularSumatoriaCoordenadasCulebrita();
            var sumatoriaCoordenadasCulebrita = objetoCalcularSumatoriaCoordenadasCulebrita.sumatoriaCoordenadasCulebrita;
            var coordenadaCulebritaX = objetoCalcularSumatoriaCoordenadasCulebrita.coordenadaCulebritaX;
            var coordenadaCulebritaY = objetoCalcularSumatoriaCoordenadasCulebrita.coordenadaCulebritaY;
        }

        // console.log( "izquierda", incrementoMarginLeft, incrementoMarginLeft, movimientoIzquierda );
    }

    
    // --- Movimiento hacia abajo
    if ( movimientoAbajo ) {
        
        // --- Si la culebrita llega a la posición mayor a 650px pierde y se vuelve a inicializar.
        if ( incrementoMarginTop > 650 ) {

            empezarDeNuevo(arrayCulebrita);
            return 'choco';
            
        }else {
            
            moverCabezaCulebrita(culebritaAuxiliar);
            
            // Se mueven hacia la derecha y hacia abajo si index de las partes de la culebrita es mayor o igual a 0.
            moverPartesCulebritaDerechaAbajo();

            
            cabezaCulebrita.style.transform = "rotate("+90+"deg)";
            cabezaCulebrita.style.marginTop = 20+"px";
            cabezaCulebrita.style.marginLeft = 0+"px";


            var objetoCalcularSumatoriaCoordenadasComida= calcularSumatoriaCoordenadasComida();
            var sumatoriaCoordenadasComida = objetoCalcularSumatoriaCoordenadasComida.sumatoriaCoordenadasComida;
            var coordenadaComidaX = objetoCalcularSumatoriaCoordenadasComida.coordenadaComidaX;
            var coordenadaComidaY = objetoCalcularSumatoriaCoordenadasComida.coordenadaComidaY;

            var objetoCalcularSumatoriaCoordenadasCulebrita = calcularSumatoriaCoordenadasCulebrita();
            var sumatoriaCoordenadasCulebrita = objetoCalcularSumatoriaCoordenadasCulebrita.sumatoriaCoordenadasCulebrita;
            var coordenadaCulebritaX = objetoCalcularSumatoriaCoordenadasCulebrita.coordenadaCulebritaX;
            var coordenadaCulebritaY = objetoCalcularSumatoriaCoordenadasCulebrita.coordenadaCulebritaY;

            // --- Incremento pixeles arriba.
            incrementoMarginTop++;
            // --- Incremento pixeles izquierda.
            incrementoMarginLeftMovimientoAbajo++;

        }

        // console.log( "abajo", movimientoAbajo, incrementoMarginTop );
    }


    // --- Movimiento hacia arriba
    if ( movimientoArriba ) {

        // --- Incremento pixeles arriba.
        incrementoMarginTop--;

        // --- Si la culebrita llega a la posición <= 0px pierde y se vuelve a inicializar.
        if ( incrementoMarginTop < 0 ) {

            empezarDeNuevo(arrayCulebrita);
            return 'choco';

        }else {

            moverCabezaCulebrita(culebritaAuxiliar);

            cabezaCulebrita.style.transform = "rotate("+90+"deg)";
            cabezaCulebrita.style.marginTop = 0+"px";
            cabezaCulebrita.style.marginLeft = 0+"px";

            var objetoCalcularSumatoriaCoordenadasComida= calcularSumatoriaCoordenadasComida();
            var sumatoriaCoordenadasComida = objetoCalcularSumatoriaCoordenadasComida.sumatoriaCoordenadasComida;
            var coordenadaComidaX = objetoCalcularSumatoriaCoordenadasComida.coordenadaComidaX;
            var coordenadaComidaY = objetoCalcularSumatoriaCoordenadasComida.coordenadaComidaY;

            var objetoCalcularSumatoriaCoordenadasCulebrita = calcularSumatoriaCoordenadasCulebrita();
            var sumatoriaCoordenadasCulebrita = objetoCalcularSumatoriaCoordenadasCulebrita.sumatoriaCoordenadasCulebrita;
            var coordenadaCulebritaX = objetoCalcularSumatoriaCoordenadasCulebrita.coordenadaCulebritaX;
            var coordenadaCulebritaY = objetoCalcularSumatoriaCoordenadasCulebrita.coordenadaCulebritaY;
        }

        // console.log( "arriba", movimientoArriba, incrementoMarginTop );
    }

    // Se valida que la culebrita pase por la misma cordenada de la comida o dentro del rango del tamaño de la culebrita.
    if (    ( 
                (coordenadaComidaX >= coordenadaCulebritaX) && (coordenadaComidaX <= (coordenadaCulebritaX+30)) 
            )
            && 
            ( 
                (coordenadaComidaY >= coordenadaCulebritaY) && (coordenadaComidaY <= (coordenadaCulebritaY+30)) 
            ) 
    )  {
       
        console.log("OK!!!");
        // console.log(coordenadaComidaX, coordenadaComidaY, coordenadaCulebritaY, coordenadaCulebritaX); 

        // --- Incremento de puntaje.
        totalPuntos++;
        contenedorPuntos.innerText = totalPuntos;

        // --- Dibujar de nuevo la comida.
        dibujarComida();
    }

}


function empezarDeNuevo(arrayCulebrita) {
    incrementoMarginLeft = 0;
    incrementoMarginRight = 0;
    incrementoMarginTop = 0;
    incrementoMarginBottom = 0;

    movimientoDerecha = true;
    movimientoIzquierda = false;
    movimientoArriba = false;
    movimientoAbajo = false;

    for (var culebritaAuxiliar of arrayCulebrita) {
        culebritaAuxiliar.removeAttribute("style");
    }
    
}

// --- Dibujar comida.
dibujarComida();
function dibujarComida() {

    var comida = document.getElementsByClassName("comida");
    var comidaAuxiliar = comida[0];

    // Se le resta al total de pixeles al conenedor principal el padding dado al mismo en coordenadas (x, y) y el tamaño de elemento comida.
    // -20px del padding y -10px del elemento comida.
    var pixelesLibresEjeX = 570;
    var pixelesLibresEjeY = 338;

    var coordenadaAleatoriaX = parseInt(Math.random() * pixelesLibresEjeX );
    var coordenadaAleatoriaY = parseInt(Math.random() * pixelesLibresEjeY );
    
    if ( coordenadaAleatoriaX <= 1 ) {
        coordenadaAleatoriaX += 1;
    }

    //////////////////////Coordenadas prueba//////////////////////
    // x = 100;
    // y = 5;

    // comidaAuxiliar.removeAttribute("style");

    comidaAuxiliar.style.marginLeft = coordenadaAleatoriaX+"px"; // margin left
    comidaAuxiliar.style.marginTop = coordenadaAleatoriaY+"px"; // margin top
    
    // --- Mostrar comida
    comidaAuxiliar.style.display = "block";
    
    // console.log( coordenadaAleatoriaX, coordenadaAleatoriaY, comida );
}


function calcularSumatoriaCoordenadasCulebrita() {

    // ---Se ejecuta la función para obtener las coordenadas actuales (x, y).
    var objetoCoordenadasCulebrita = obtenerCoordenadasCulebrita();
    var coordenadaCulebritaX = parseInt(objetoCoordenadasCulebrita.coordenadaCulebritaX); // margin left
    var coordenadaCulebritaY = objetoCoordenadasCulebrita.coordenadaCulebritaY; // margin top
    if ( coordenadaCulebritaY != "" ) {
        coordenadaCulebritaY = parseInt(coordenadaCulebritaY);

    } else {
        coordenadaCulebritaY = 0;
    }

    // console.log(coordenadaCulebritaX, coordenadaCulebritaY);

    var sumatoriaCoordenadasCulebrita = (coordenadaCulebritaX+coordenadaCulebritaY);
    return {"sumatoriaCoordenadasCulebrita":sumatoriaCoordenadasCulebrita, "coordenadaCulebritaX":coordenadaCulebritaX, "coordenadaCulebritaY":coordenadaCulebritaY};
}

// --- Función para obtener las coordenadas de la culebrita, cuando el usuario empieza a moverla.
function obtenerCoordenadasCulebrita() {
    
    // --Array, como se utiliza ...elementsByClassName.
    var arrayCulebrita = document.getElementsByClassName("culebrita");
    // ---Elemento culebrita.
    var culebritaAuxiliar = arrayCulebrita[arrayCulebrita.length - 1];

    // -- Se obtienen las coordenadas dinámicas.
    var propiedadesEstilos = culebritaAuxiliar["style"];
    var coordenadaCulebritaX = propiedadesEstilos.marginLeft;
    var coordenadaCulebritaY = propiedadesEstilos.marginTop;

    // -- Se genera el array de la propiedad margin left (coordenada X).
    var arrayCoordenadaCulebritaX = coordenadaCulebritaX.split("");
    // -- Se quita la unidad de medida (px, em o cualquier otra que tenga longitud 2).
    arrayCoordenadaCulebritaX.splice(arrayCoordenadaCulebritaX.length - 2, arrayCoordenadaCulebritaX.length - 1);
    coordenadaCulebritaX = "";
    for (var numero of arrayCoordenadaCulebritaX ) { 
        coordenadaCulebritaX += numero; 
    }

     // -- Se genera el array de la propiedad margin left (coordenada Y).
     var arrayCoordenadaCulebritaY = coordenadaCulebritaY.split("");
     // -- Se quita la unidad de medida (px, em o cualquier otra que tenga longitud 2).
     arrayCoordenadaCulebritaY.splice(arrayCoordenadaCulebritaY.length - 2, arrayCoordenadaCulebritaY.length - 1);
     coordenadaCulebritaY = "";
     for (var numero of arrayCoordenadaCulebritaY ) { 
        coordenadaCulebritaY += numero; 
     }


    // console.log(" -- ", coordenadaCulebritaX, coordenadaCulebritaY);
    return {"coordenadaCulebritaX":coordenadaCulebritaX, "coordenadaCulebritaY":coordenadaCulebritaY};
}


function calcularSumatoriaCoordenadasComida() {

    var objetoCoordenadasComida = obtenerCoordenadasComida();
    var coordenadaComidaX = parseInt(objetoCoordenadasComida.coordenadaComidaX);
    var coordenadaComidaY = parseInt(objetoCoordenadasComida.coordenadaComidaY);

    // console.log(coordenadaComidaX, coordenadaComidaY);

    var sumatoriaCoordenadasComida = (coordenadaComidaX+coordenadaComidaY);
    return {"sumatoriaCoordenadasComida":sumatoriaCoordenadasComida, "coordenadaComidaX":coordenadaComidaX, "coordenadaComidaY":coordenadaComidaY};
}

// --- Función para obtener las coordenadas actuales de la comida.
function obtenerCoordenadasComida() {

    var comida = document.getElementsByClassName("comida");
    var comidaAuxiliar = comida[0];

    var coordenadaComidaX = comidaAuxiliar.style.marginLeft;
    var coordenadaComidaY = comidaAuxiliar.style.marginTop;

    // -- Se genera el array de la propiedad margin left (coordenada X).
    var arrayCoordenadaComidaX = coordenadaComidaX.split("");
    // -- Se quita la unidad de medida (px, em o cualquier otra que tenga longitud 2).
    arrayCoordenadaComidaX.splice(arrayCoordenadaComidaX.length - 2, arrayCoordenadaComidaX.length - 1);
    coordenadaComidaX = "";
    for (var numero of arrayCoordenadaComidaX ) { 
        coordenadaComidaX += numero; 
    }

    // -- Se genera el array de la propiedad margin left (coordenada Y).
    var arrayCoordenadaComidaY = coordenadaComidaY.split("");
    // -- Se quita la unidad de medida (px, em o cualquier otra que tenga longitud 2).
    arrayCoordenadaComidaY.splice(arrayCoordenadaComidaY.length - 2, arrayCoordenadaComidaY.length - 1);
    coordenadaComidaY = "";
    for (var numero of arrayCoordenadaComidaY ) { 
        coordenadaComidaY += numero; 
    }

    // console.log(coordenadaComidaX, coordenadaComidaY);
    return {"coordenadaComidaX":coordenadaComidaX, "coordenadaComidaY":coordenadaComidaY};
}


function moverCabezaCulebrita(culebritaAuxiliar) {

    // --- Movimientos cabeza culebrita.
    if ( movimientoDerecha || movimientoIzquierda) {
        culebritaAuxiliar.style.marginLeft = incrementoMarginLeft+"px";  
    }

    if ( movimientoAbajo || movimientoArriba) {
        culebritaAuxiliar.style.marginTop = incrementoMarginTop+"px";  
    }

}

function moverPartesCulebritaDerecha() {

    var incrementoPartesCulebrita = 30;
    var indexPartesCulebrita = arrayPartesCulebrita.length - 1;

    // arrayPartesCulebrita[4].style.marginLeft = incrementoMarginLeft - 30+"px";
    // arrayPartesCulebrita[3].style.marginLeft = incrementoMarginLeft - 60+"px";
    // arrayPartesCulebrita[2].style.marginLeft = incrementoMarginLeft - 90+"px";
    // arrayPartesCulebrita[1].style.marginLeft = incrementoMarginLeft - 120+"px";
    //   |
    //   |
    //   |
    //   |
    //   |
    //   |
    //   v
    while( indexPartesCulebrita >= 0 ) {
        // console.log(incrementoMarginLeft);
        arrayPartesCulebrita[indexPartesCulebrita].style.marginLeft = incrementoMarginLeft - incrementoPartesCulebrita+"px";
        incrementoPartesCulebrita += 30;
        indexPartesCulebrita -= 1;
    }

}


// ---- Movimiento hacia derecha hacia bajo de las partes de la culebrita.
var decremento = 30;
var indexParteCulebrita = arrayPartesCulebrita.length - 1;
function moverPartesCulebritaDerechaAbajo() {

    /**
     * Se obtiene el {margin top} de la parte principal de laculebrita.
     */
    var stringPartePrincipalCulebritaMarginTop = partePrincipalCulebrita.style.marginTop;
    // -- Se genera el array de la propiedad margin top (coordenada Y).
    var arrayStringPartePrincipalCulebritaMarginTop = stringPartePrincipalCulebritaMarginTop.split("");
    // -- Se quita la unidad de medida (px, em o cualquier otra que tenga longitud 2).
    arrayStringPartePrincipalCulebritaMarginTop.splice(arrayStringPartePrincipalCulebritaMarginTop.length - 2, arrayStringPartePrincipalCulebritaMarginTop.length - 1);
    var intPartePrincipalCulebritaMarginTop = "";
    for (var numero of arrayStringPartePrincipalCulebritaMarginTop ) { 
        intPartePrincipalCulebritaMarginTop += numero; 
    }

    intPartePrincipalCulebritaMarginTop = parseInt(intPartePrincipalCulebritaMarginTop);
    // console.log(intPartePrincipalCulebritaMarginTop);


    /**
     * Se obtiene el {margin left} de la parte principal de laculebrita.
     */
    var stringMarginLeftPartePrincipalCulebrita = partePrincipalCulebrita.style.marginLeft;
    // -- Se genera el array de la propiedad margin left (coordenada X).
    var arrayStringMarginLeftPartePrincipalCulebrita = stringMarginLeftPartePrincipalCulebrita.split("");
    // -- Se quita la unidad de medida (px, em o cualquier otra que tenga longitud 2).
    arrayStringMarginLeftPartePrincipalCulebrita.splice(arrayStringMarginLeftPartePrincipalCulebrita.length - 2, arrayStringMarginLeftPartePrincipalCulebrita.length - 1);
    var intMarginLeftPartePrincipalCulebrita = "";
    for (var numero of arrayStringMarginLeftPartePrincipalCulebrita ) { 
        intMarginLeftPartePrincipalCulebrita += numero; 
    }

    intMarginLeftPartePrincipalCulebrita = parseInt(intMarginLeftPartePrincipalCulebrita);

    // console.log(" ----- ", intMarginLeftPartePrincipalCulebrita, ' marginTop: ', intPartePrincipalCulebritaMarginTop);
    

    var indexPartesCulebrita = arrayPartesCulebrita.length - 1;
    while( indexPartesCulebrita >= 0 ) {

        /**
         * Se obtiene el {margin left} de las partes de laculebrita.
         */
        var parteCulebrita = arrayPartesCulebrita[indexPartesCulebrita];

        // ----Separar número de pixeles {margin left} de cada parte de la culebrita.
        var marginLeftActualPartesCulebrita = parteCulebrita.style.marginLeft;
        // -- Se genera el array de la propiedad margin left (coordenada X).
        var arraymarginLeftActualPartesCulebrita = marginLeftActualPartesCulebrita.split("");
        // -- Se quita la unidad de medida (px, em o cualquier otra que tenga longitud 2).
        arraymarginLeftActualPartesCulebrita.splice(arraymarginLeftActualPartesCulebrita.length - 2, arraymarginLeftActualPartesCulebrita.length - 1);
        var intMarginLeftActualPartesCulebrita = "";
        for (var numero of arraymarginLeftActualPartesCulebrita ) { 
            intMarginLeftActualPartesCulebrita += numero; 
        }

        intMarginLeftActualPartesCulebrita = parseInt(intMarginLeftActualPartesCulebrita);
        // console.log(incrementoMarginLeft);


        /**
         * Se valida que no pasen las partes de la culebrita de la ubicación actual de la cabeza de la culebrita.
         */
        if ( intMarginLeftActualPartesCulebrita != intMarginLeftPartePrincipalCulebrita ) {
            
            // Se van moviendo las partes de la culebrita hacia la derecha.
            parteCulebrita.style.marginLeft = (intMarginLeftActualPartesCulebrita+1)+"px";
        } 
        
        indexPartesCulebrita -= 1;
    }

} 