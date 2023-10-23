<?php
/*
agregarAutoSinFoto.php: Se recibe por POST el parámetro auto_json (patente, marca, color y precio), en formato de cadena JSON. Se invocará al método agregar.
*                       Se retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
*/

require_once "./clases/autoBD.php";

use Tignino_Christian\AutoBD;

$autoJSON = isset($_POST['auto_json']) ? $_POST['auto_json'] : null;

$lectura = json_decode($autoJSON, true);

$auto =  new AutoBD($lectura['patente'], $lectura['marca'], $lectura['color'], $lectura['precio']);

$objRt = new stdClass();
$objRt->exito = false;
$objRt->mensaje = "No se agregó.";

if($auto->agregar())
{
    $objRt->exito = true;
    $objRt->mensaje = "Auto Agregado!";
    echo json_encode($objRt);
} else {
    echo json_encode($objRt);
}

?>