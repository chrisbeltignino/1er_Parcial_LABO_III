"use strict";
/// <reference path="clases.ts" />
/// <reference path="interfaces.ts" />
var PrimerParcial;
(function (PrimerParcial) {
    const xhttp = new XMLHttpRequest();
    const formData = new FormData();
    class Manejadora {
        static AgregarAutoJSON() {
            let patente = document.getElementById("patente").value;
            let marca = document.getElementById("marca").value;
            let color = document.getElementById("color").value;
            let precio = document.getElementById("precio").value;
            xhttp.open('POST', './BACKEND/altaAutoJSON.php', true);
            formData.append('patente', patente);
            formData.append('marca', marca);
            formData.append('color', color);
            formData.append('precio', precio);
            xhttp.send(formData);
            this.MostrarAutosJSON();
            this.LimpiarAutos();
        }
        static MostrarAutosJSON() {
            xhttp.open('GET', './BACKEND/listadoAutosJSON.php', true);
            xhttp.send();
            xhttp.onreadystatechange = () => {
                let div = document.getElementById("divTabla");
                let tabla = `<table>
                <tr>
                <th>PATENTE</th><th>MARCA</th><th>COLOR</th><th>PRECIO</th>
                </tr>`;
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let jsonMsj = JSON.parse(xhttp.responseText);
                    for (let i = 0; i < jsonMsj.length; i++) {
                        let dato = jsonMsj[i];
                        tabla += `<tr>
                        <th>${dato.patente}</th><th>${dato.marca}</th><th>${dato.color}</th><th>${dato.precio}</th>
                        </tr>
                        `;
                    }
                }
                tabla += `</table>`;
                div.innerHTML = tabla;
            };
        }
        static VerificarAutosJSON() {
            let patente = document.getElementById("patente").value;
            formData.append('patente', patente);
            xhttp.open('POST', './BACKEND/verificarAutoJSON.php', true);
            xhttp.send(formData);
            this.RespuestaJSON();
            this.LimpiarAutos();
        }
        ////////////////////////////////////////////////////////------PARTE 2------////////////////////////////////////////////////////////
        static AgregarAutoSinFoto() {
            let patente = document.getElementById("patente").value;
            let marca = document.getElementById("marca").value;
            let color = document.getElementById("color").value;
            let precio = parseInt(document.getElementById("precio").value);
            let auto = new Tignino_Christian.Auto(patente, marca, color, precio);
            xhttp.open('POST', './BACKEND/agregarAutoSinFoto.php', true);
            formData.append('auto_json', JSON.stringify(auto));
            xhttp.send(formData);
            this.RespuestaAutosBDJSON();
            this.LimpiarAutosBDHTML();
        }
        static MostrarAutosBD() {
            xhttp.open('GET', './BACKEND/listadoAutosBD.php', true);
            xhttp.send();
            xhttp.onreadystatechange = () => {
                let div = document.getElementById("divTabla");
                let tabla = `<table>
               <tr>
                      <th>PATENTE</th><th>MARCA</th><th>COLOR</th><th>PRECIO</th><th>FOTO</th><th>ACCION</th>
               </tr>`;
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let jsonMsj = JSON.parse(xhttp.responseText);
                    for (let i = 0; i < jsonMsj.length; i++) {
                        let dato = jsonMsj[i];
                        if (dato.pathFoto == "" || dato.pathFoto == null) {
                            tabla += `<tr>
                            <th>${dato.patente}</th><th>${dato.marca}</th><th>${dato.color}</th><th>${dato.precio}</th><th></th><th>
                            <button type="button" class="btn btn-info" id="" data-obj=' ${JSON.stringify(dato)} '
                            name="btnModificar"><span class="bi bi-pencil"></span>
                            </button>
                            <button type="button" class="btn btn-danger" id="" data-obj=' ${JSON.stringify(dato)} ' name="btnEliminar"> 
                            <span class="bi bi-x-circle"></span>
                            </button></th>
                            </tr>
                            `;
                        }
                        else {
                            tabla += `<tr><th>${dato.patente}</th><th>${dato.marca}</th><th>${dato.color}</th><th>${dato.precio}</th><th> <img src=${dato.pathFoto} width=50 height=50 /></th><th>
                            <button type="button" class="btn btn-info" id="" data-obj=' ${JSON.stringify(dato)} '
                                name="btnModificar"><span class="bi bi-pencil"></span>
                                </button>
                                <button type="button" class="btn btn-danger" id="" data-obj=' ${JSON.stringify(dato)} ' name="btnEliminar"> 
                                <span class="bi bi-x-circle"></span>
                                </button></th>
                            </tr>
                            `;
                        }
                    }
                }
                tabla += `</table>`;
                div.innerHTML = tabla;
                this.AsignarManejadoresModificar();
                this.AsignarManejadoresEliminar();
            };
        }
        static ObtenerModificarSinFoto(dato) {
            let obj = dato.getAttribute("data-obj");
            let obj_dato = JSON.parse(obj);
            document.getElementById("patente").value = obj_dato.patente;
            document.getElementById("marca").value = obj_dato.marca;
            document.getElementById("color").value = obj_dato.color;
            document.getElementById("precio").value = obj_dato.precio;
            if (document.getElementById("imgFoto")) {
                document.getElementById("imgFoto").src = obj_dato.pathFoto;
                document.getElementById("foto").src = document.getElementById("imgFoto").src;
            }
        }
        static modificarAutoSinFoto() {
            let m = new Manejadora();
            m.ModificarAuto();
        }
        ModificarAuto() {
            let patente = document.getElementById("patente").value;
            let marca = document.getElementById("marca").value;
            let color = document.getElementById("color").value;
            let precio = parseInt(document.getElementById("precio").value);
            let auto = new Tignino_Christian.Auto(patente, marca, color, precio);
            xhttp.open('POST', './backend/modificarAutoBD.php', true);
            formData.append('auto_json', JSON.stringify(auto));
            xhttp.send(formData);
            Manejadora.RespuestaAutosBDJSON();
            Manejadora.LimpiarAutosBDHTML();
        }
        EliminarAuto(boton, fila) {
            document.getElementsByName("btnEliminar").forEach(boton => {
                boton.addEventListener("click", () => {
                    let dataObj = boton.getAttribute("data-obj");
                    if (dataObj) {
                        let dato = JSON.parse(dataObj);
                        let patente = dato.patente;
                        let marca = dato.marca;
                        let color = dato.color;
                        let precio = dato.precio;
                        let auto = new Tignino_Christian.AutoBD(patente, marca, color, precio, "");
                        let opcion = confirm(`Seguro que quieres eliminar el auto ${patente} marca ${marca}?`);
                        if (opcion) {
                            xhttp.open('POST', './BACKEND/eliminarAutoBD.php', true);
                            formData.append('auto_json', JSON.stringify(auto));
                            xhttp.send(formData);
                            Manejadora.RespuestaAutosBDJSON();
                            Manejadora.LimpiarAutosBDHTML();
                        }
                        else {
                            alert("Se cancelo la operacion");
                        }
                    }
                    else {
                        console.error('La propiedad data-obj está vacía.');
                    }
                });
            });
        }
        ////////////////////////////////////////////////////////------PARTE 3------////////////////////////////////////////////////////////
        //////////////////////////////////////////------FUNCIONES EXTRAS--------////////////////////////////////////
        static Fail(retorno) {
            console.error(retorno);
            alert("Ha ocurrido un ERROR!!!");
        }
        static LimpiarAutos() {
            document.getElementById("patente").value = "";
            document.getElementById("marca").value = "";
            document.getElementById("color").value = '#000000';
            document.getElementById("precio").value = "";
        }
        static RespuestaJSON() {
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let jsonMsj = JSON.parse(xhttp.responseText);
                    console.log(xhttp.responseText);
                    alert(jsonMsj.mensaje);
                    if (jsonMsj.exito) {
                        this.MostrarAutosJSON();
                    }
                }
            };
        }
        static LimpiarFoto() {
            document.getElementById("foto").value = "";
            document.getElementById("imgFoto").src = "./auto.defaul.jfif";
        }
        static LimpiarAutosBDHTML() {
            document.getElementById("patente").value = "";
            if (document.getElementById("foto")) {
                this.LimpiarFoto();
            }
            this.LimpiarAutos();
        }
        static AsignarManejadoresModificar() {
            document.getElementsByName("btnModificar").forEach((elemento) => {
                elemento.addEventListener("click", () => { this.ObtenerModificarSinFoto(elemento); });
            });
        }
        static AsignarManejadoresEliminar() {
            let botonesEliminar = document.getElementsByName("btnEliminar");
            let m = new Manejadora();
            botonesEliminar.forEach((boton) => {
                boton.addEventListener("click", () => {
                    let fila = boton.closest("tr");
                    m.EliminarAuto(boton, fila);
                });
            });
        }
        static BorrarCampos() {
            this.LimpiarAutosBDHTML();
        }
        static RespuestaAutosBDJSON() {
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let jsonMsj = JSON.parse(xhttp.responseText);
                    console.log(xhttp.responseText);
                    alert(jsonMsj.mensaje);
                    if (jsonMsj.exito) {
                        this.MostrarAutosBD();
                    }
                }
            };
        }
    }
    Manejadora.URL_API = "./";
    Manejadora.AJAX = new PrimerParcial.Ajax();
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
