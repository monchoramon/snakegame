<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake 30-07-2021</title>
    <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>
    <div class="main">
        <div class="contanier-principal">
            <div class="marcador">
                <li>Puntos: <span id="totalPuntos">0</span></li>
            </div>
            <div class="contenedorPartesCulebrita">
                <div class="culebrita parteTraseraCulebrita 1" style="margin-left:0px"></div>   <!-- 6 {index 0} -->
                <div class="culebrita parteTraseraCulebrita 2" style="margin-left:30px"></div>  <!-- 5 {index 1} -->
                <div class="culebrita parteTraseraCulebrita 3" style="margin-left:60px"></div>  <!-- 4 {index 2} -->
                <div class="culebrita parteTraseraCulebrita 4" style="margin-left:90px"></div>  <!-- 3 {index 3} -->
                <div class="culebrita parteTraseraCulebrita 5" style="margin-left:120px"></div> <!-- 2 {index 4} -->
            </div>
            <div class="culebrita culebritaPrincipal" style="margin-left:150px">
                <div id="cabeza"></div>
            </div>
            <div class="comida"></div>
        </div>
    </div>
    <script src="modulos/js/main.js"></script>
</body>
</html>