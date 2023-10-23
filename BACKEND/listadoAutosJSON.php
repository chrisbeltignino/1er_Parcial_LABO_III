<?php
use Tignino_Christian\Auto;
require_once './clases/auto.php';

$accion = isset($_GET["accion"]);
$resultado = Auto::traerJSON('clases/archivos/autos.json');

if ($resultado != null) 
{
    echo json_encode($resultado);
} 
else 
{
    echo "No se pudo cargar el archivo JSON.";
}