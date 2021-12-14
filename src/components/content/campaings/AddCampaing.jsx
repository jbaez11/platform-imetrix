import React,{useState} from 'react'
import {rutaAPI} from '../../../config/Config';
import $ from 'jquery';
import notie from 'notie';
import 'notie/dist/notie.css';

export default function AddCampaing(){
    const valores = window.location.href;
    let nuevaURL = valores.split("/");

    //HOOK para Capturar los Datos
    const [campaing, crearCampaing] = useState({
        nombre:"",
        foto: null,
        state: "",
        cluster:"",
        pais:""
    })

    //OnChange
    const cambiaFormPost = e =>{

        let foto = $("#foto").get(0).files;
        if(!foto.length){
            return
        }
        foto = foto[0]
        //Validamos el Formato de la imagen
        if(foto["type"] !== "image/jpeg" && foto["type"] !== "image/png"){
            $("#foto").val("");
            notie.alert({
                type:3,
                text:"¡ERROR: La foto debe estar en formato JPG o PNG!",
                time: 3,
                position: 'bottom'
            })
            $(".previsualizarImg").attr("src", "");
            return;
        }else if(foto["size"] > 10000000){
            $("#foto").val("");
            alert('¡ERROR: La foto no debe pesar mas de 3MB!');
            $(".previsualizarImg").attr("src", "");
            return;
        }else{
            let datosFoto = new FileReader();
            datosFoto.readAsDataURL(foto);

            $(datosFoto).on("load", function(event){
                let rutaFoto = event.target.result;
                $(".previsualizarImg").attr("src", rutaFoto);

                crearCampaing({
                    'nombre': $("#nombre").val(), 
                    'foto': foto,
                    'state': $("#state").val(),
                   // 'cluster': $("#cluster").val(),
                    'pais': $("#pais").val()
                })
            })        
        }
    }

    //OnSubmit
    const submitPost = async e =>{
        $('.alert').remove();
        e.preventDefault();
        const {nombre, foto, state, pais} = campaing;

        if(nombre === ""){
            $(".invalid-nombre").show();
            $(".invalid-nombre").html("El nombre de la Campaña no puede ir Vacio!");
        }
        //Validamos si la foto viene vacia
        if(foto === null){
            $(".invalid-foto").show();
            $(".invalid-foto").html("La foto no puede ir vacia!");

            return;
        }
        if(state === ""){
            $(".invalid-state").show();
            $(".invalid-state").html("El estado de la Campaña no puede ir Vacio!");
        }
        if(pais === ""){
            $(".invalid-state").show();
            $(".invalid-state").html("El Pais de la Campaña no puede ir Vacio!");
        }

        

        //Ejecutamos el servicio post
        const result = await postData(campaing);
        if(result.status === 400){
            $(".modal-footer").before(`<div class="alert alert-danger">${result.mensaje}</div>`)
        } 
        if(result.status === 200){
            $(".modal-footer").before(`<div class="alert alert-success">${result.mensaje}</div>`)
            $('button[type="submit"]').remove();
            setTimeout(()=>{window.location.href=`/campañasinicio/${nuevaURL[4]}`},2000);
        }
    }

    //Limpiar formulario
    $(document).on("click", ".limpiarFormulario", function(){
        $('.modal').find('form')[0].reset();
        $('.previsualizarImg').attr("src","");
    })

    return(

        <div className="modal" id="addCampaing">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Crear Campaña</h4>
                        <button type="button" className="btn-close" data-dismiss="modal"></button>
                    </div>
                    <form onChange={cambiaFormPost} onSubmit={submitPost} encType="multipart/form-data">
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="nombre">
                                    *Min. 2 Caracteres | Max. 20 | Sin caracteres especiales.
                                </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-signature"></i>
                                    </div>
                                    <input
                                        id="nombre"
                                        type="text"
                                        className="form-control text-uppercase"
                                        name="nombre"
                                        placeholder="Ingrese el nombre de la Campaña"
                                        minLength="2"
                                        maxLength="30"
                                        pattern="([A-Za-z]).{2,30}"
                                        required
                                    />
                                </div>
                                <div className="invalid-feedback invalid-nombre"></div>
                            </div>
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="foto">
                                        *Peso Max. 3MB | Formato: JPG o PNG</label>
                                <input
                                    id="foto"
                                    type="file"
                                    className="form-control-file border"
                                    name="foto"
                                    required
                                />
                                <div className="invalid-feedback invalid-foto"></div>
                                <img className="previsualizarImg img-fluid" alt=""/>
                            </div>
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="state">
                                    Habilitado | Inhabilitado
                                </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-user-check"></i>
                                    </div>
                                    <select name="state" id="state">
                                        <option value="" selected hidden>Seleccionar estado</option>
                                        <option value="1">Habilitado</option>
                                        <option value="0">Inhabilitado</option>
                                    </select>
                                </div>
                                <div className="invalid-feedback invalid-state"></div>
                            </div>
                            <div hidden className="form-group">
                                <label className="small text-secondary" htmlFor="cluster">
                                    *Solo se permite el ID del cluster a asociar
                                </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-user-check"></i>
                                    </div>
                                    <input
                                        id="cluster"
                                        type="text"
                                        className="form-control"
                                        name="cluster"
                                        placeholder="Ingrese el ID cluster"
                                        minLength="24"
                                        maxLength="24"
                                        pattern="(?=.*\d).{24,24}"
            
                                    />
                                </div>
                                <div className="invalid-feedback invalid-state"></div>
                            </div>
                            <div className="form-group">
                                <label className="small text-secondary" htmlFor="pais">
                                   | *Solo con el siguiente formato -- | CO-US-MX
                                </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-signature"></i>
                                    </div>
                                    <input
                                        id="pais"
                                        type="text"
                                        className="form-control text-uppercase"
                                        name="pais"
                                        placeholder="Ingrese el pais"
                                        minLength="2"
                                        maxLength="2"
                                        onKeyUp="this.value=this.value.toUpperCase();"
                                        pattern="(?=.*[A-Z]).{2,2}"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <div><button type="submit" className="btn btn-primary">Crear</button></div>
                            <div><button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

//PETICION POST PARA CAMPAÑAS
const postData = data =>{
    const url = `${rutaAPI}/addCampaing`
    const valores = window.location.href;
    let nuevaURL = valores.split("/");
    data.cluster = nuevaURL[4];
    
    let formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("foto", data.foto);
    formData.append("state", data.state);
    formData.append("cluster", data.cluster);
    formData.append("pais", data.pais);
    
    const token =  localStorage.getItem("ACCESS_TOKEN");
    const params = {

        method: "POST",
		body:formData,
		headers: {
			"Authorization": token
		}

    }
    return fetch(url, params).then(response=>{
        return response.json();
    }).then(result=>{
        return result;
    }).catch(err=>{
        return err;
    });
}