namespace Tignino_Christian
{
    export class Auto
    {
        protected patente : string;
        protected marca : string;
        protected color : string;
        protected precio : Number;

        constructor(patente:string,marca:string,color:string,precio:Number)
        {
            this.patente = patente;
            this.marca = marca;
            this.color = color;
            this.precio = precio;
        }

        GetPatente()
        {
            return this.patente;
        }

        GetMarca()
        {
            return this.marca;
        }

        GetColor()
        {
            return this.color;
        }

        GetPrecio()
        {
            return this.precio;
        }


        toString():string
        {
            let str = "patente:"+this.patente+"marca:"+this.marca+","+"color:"+this.color+","+"precio:"+this.precio;
            return str;
        }

        ToJSON()
        {
            let js = JSON.stringify(this.toString());
            return js;
        }

    }
    
    export class AutoBD extends Auto
    {
        pathFoto : string;

        public constructor(patente?:string,marca?:string,color?:string,precio?:Number,pathFoto?:string)
        {
            super(patente ? patente:"",marca ? marca:"",color ? color:"",precio ? precio:0);
            this.pathFoto = pathFoto ? pathFoto : "";
        }

        ToJSON(): string 
        {
            let js = super.toString()+","+"patente:"+this.patente+","+"pathFoto:"+this.pathFoto;
            js = JSON.stringify(js);
            return js;
        }
    }
}