"use strict";
var Tignino_Christian;
(function (Tignino_Christian) {
    class Auto {
        constructor(patente, marca, color, precio) {
            this.patente = patente;
            this.marca = marca;
            this.color = color;
            this.precio = precio;
        }
        GetPatente() {
            return this.patente;
        }
        GetMarca() {
            return this.marca;
        }
        GetColor() {
            return this.color;
        }
        GetPrecio() {
            return this.precio;
        }
        toString() {
            let str = "patente:" + this.patente + "marca:" + this.marca + "," + "color:" + this.color + "," + "precio:" + this.precio;
            return str;
        }
        ToJSON() {
            let js = JSON.stringify(this.toString());
            return js;
        }
    }
    Tignino_Christian.Auto = Auto;
    class AutoBD extends Auto {
        constructor(patente, marca, color, precio, pathFoto) {
            super(patente ? patente : "", marca ? marca : "", color ? color : "", precio ? precio : 0);
            this.pathFoto = pathFoto ? pathFoto : "";
        }
        ToJSON() {
            let js = super.toString() + "," + "patente:" + this.patente + "," + "pathFoto:" + this.pathFoto;
            js = JSON.stringify(js);
            return js;
        }
    }
    Tignino_Christian.AutoBD = AutoBD;
})(Tignino_Christian || (Tignino_Christian = {}));
