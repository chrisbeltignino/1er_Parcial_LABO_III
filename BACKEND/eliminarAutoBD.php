<?php

require_once "./clases/autoBD.php";
use Tignino_Christian\AutoBD;

$auto_json = isset($_POST["auto_json"]) ? $_POST["auto_json"] : null;

$lectura = json_decode($auto_json, true);

$auto = new AutoBD($lectura["patente"], $lectura["marca"], $lectura["color"], $lectura["precio"]);

$objRt = new stdClass();
$objRt->exito = true;
$objRt->mensaje = "No se elimino correctamente";

if(AutoBD::eliminar($auto->GetPatente()))
{
    $objRt->exito = true;
    $objRt->mensaje = "Se elimino correctamente";
    $auto->guardarJSON('clases/archivos/autos_eliminados.json'); // cambiar path
    echo json_encode($objRt);
} else {
    echo json_encode($objRt);
}

?>