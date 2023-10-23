<?php

use Tignino_Christian\AutoBD;
require_once "./clases/autoBD.php";

if(isset($_GET["tabla"]) == "mostrar")
{
    $tabla = "<table><tr><td>PATENTE</td><td>MARCA</td><td>COLOR</td><td>PRECIO</td><td>FOTO</td></tr>";
    $array = AutoBD::traer();

    $auto = new stdClass;

    foreach($array as $e)
    {
        $neu = json_decode($e->toJSON());
        $tabla .= "<tr><td>{$auto->patente}</td><td>{$auto->marca}</td><td>{$auto->color}</td><td>{$auto->precio}</td><td><img src={$auto->pathFoto} ></td></tr></br>";
    }

    $tabla.="</table>";

    echo $tabla;

} else {
    $array = AutoBD::traer();
    $arrRt = array();
        foreach($array as $obj)
        {
            $stdRt = new stdClass;
            $stdRt->patente = $obj->GetPatente();
            $stdRt->marca = $obj->GetMarca();
            $stdRt->color = $obj->GetColor();
            $stdRt->precio = $obj->GetPrecio();
            $stdRt->pathFoto = $obj->GetFoto();
            array_push($arrRt,$stdRt);
        }

        echo json_encode($arrRt);
}

?>

