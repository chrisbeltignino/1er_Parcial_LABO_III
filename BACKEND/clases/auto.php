<?php 
namespace Tignino_Christian
{
    use stdClass;

    class Auto
    {
        protected string $patente;
        protected string $marca;
        protected string $color;
        protected float $precio;

        public function __construct(string $patente = "", string $marca = "", string $color = "", float $precio = 0)
        {
            $this->patente = $patente;
            $this->marca = $marca;
            $this->color = $color;
            $this->precio = $precio;
        }

        public function GetPatente()
        {
            return $this->patente;
        }

        public function toJSON():string{
            return json_encode(get_object_vars($this));
        }

        //Método de instancia guardarJSON($path), que agregará al auto en el path recibido por parámetro. Retornará un 
        //JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        public function guardarJSON($path) : string {
            $objRespuesta = new stdClass();
            $objRespuesta->exito = false;
            $objRespuesta->mensaje = "Ocurrio un error. No se pudo guardar el archivo";

            $ar = fopen($path,"a");

            $cant = fwrite($ar,$this->toJSON()."\r\n");

            if($cant > 0)
            {
                $objRespuesta->exito = true;
                $objRespuesta->mensaje = "Registro guardado con exito!";
            }

            fclose($ar);

            return json_encode(get_object_vars($objRespuesta));
        }

        //Método de clase verificarAutoJSON($auto), que recorrerá el array obtenido del método traerJSON y retornará un
        //JSON que contendrá: existe(bool) y mensaje(string).
        public static function verificarAutoJSON(Auto $auto):string
        {
            $path = "clases/archivos/autos.json";

            $objRta = new stdClass();
            $objRta->exito = false;
            $objRta->mensaje = "No se encontro el auto";

            $arrAutos = Auto::traerJSON($path);
            foreach($arrAutos as $autoAComprobar)
            {
                //var_dump($arrAutos);
                if($auto->GetPatente() == $autoAComprobar->patente)
                {
                    $objRta->exito = true;
                    $objRta->mensaje = 'El auto esta registrado.';
                }
            }

            return json_encode($objRta);
        }

        //Método de clase traerJSON($path), que retornará un array de objetos de tipo auto (recuperados del path).
        public static function traerJSON($path){
            $retorno = array();
            $str ="";
            $ar = fopen($path, "r");
    
            while(!feof($ar))
            {
                $str = fgets($ar);
                if($str != "")
                {
                    array_push($retorno,json_decode($str));	 
                }        	
            }
    
            fclose($ar);
    
            return $retorno;
        }

        public static function TraerTodosJSON(string $path)
        {
            $autos = [];
            $ar = fopen($path, "r");

            while (!feof($ar)) 
            {
                $linea = fgets($ar);
                $autos = json_decode($linea);
        
                if (isset($autos)) 
                {
                    $autos[] = $autos;
                }
            }

            fclose($ar);

            return json_encode($autos, JSON_PRETTY_PRINT);
        }
    }
}
?>