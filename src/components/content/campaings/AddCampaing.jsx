import React,{useState} from 'react'
import { useEffect } from "react";
import {rutaAPI} from '../../../config/Config';
import $ from 'jquery';
import notie from 'notie';
import 'notie/dist/notie.css';

export default function AddCampaing(){

    const currentUserId = localStorage.getItem("ID");
    const valores = window.location.href;
    let nuevaURL = valores.split("/");

    const [users, setUsers] = React.useState([]);

    const [states, setStates] = React.useState([
        {
          nombre: "habilitado",
          value: "1",
        },
        {
          nombre: "Inhabilitado",
          value: "0",
        },
      ]);

    React.useEffect(() => {
        obtenerUsuarios();
    }, []);
    
    const obtenerUsuarios = async () => {
        const data = await fetch(`${rutaAPI}/getUser/${currentUserId}`);
        const user = await data.json();
        //console.log("Admin Users", user.data)
        setUsers(user.data);
        console.log("Users", user.data);
    };
    
    /* Users on Change */
    const userChange = (user) => {
        let nUsers = campaing.users;
        let index = nUsers.findIndex((c) => c._id === user._id);
        if (index !== -1) {
          nUsers.splice(index, 1);
        } else {
          nUsers.push(user);
        }
        crearCampaing({
          ...campaing,
          users: nUsers,
        });
        console.log("Usuarios para la Campaña", campaing);
    };

    //HOOK para Capturar los Datos
    const [campaing, crearCampaing] = useState({
        nombre:"",
        foto: null,
        state: "",
        cluster:"",
        pais:"",
        users:[]
    })

    useEffect(() => {
        console.log("Actualización de la Campaña", campaing);
    }, [campaing]);

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
                    ...campaing, 
                    foto,
                    state: $("#state").val(),
                    pais: $("#pais").val()
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
            setTimeout(()=>{window.location.href=`/campañas/${nuevaURL[4]}/${nuevaURL[5]}`},2000);
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
                                    *Min. 2 Caracteres | Max. 30 | Sin caracteres especiales.
                                </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-signature"></i>
                                    </div>
                                    <input
                                     onChange={(e) =>
                                        crearCampaing({ ...campaing, nombre: e.target.value })
                                      }
                                        id="nombre"
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        placeholder="Ingrese el nombre de la Campaña"
                                        minLength="2"
                                        maxLength="30"
                                        pattern="^[a-zA-Z]+( [a-zA-Z]+)*$"
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
                        <select
                            onChange={(e) =>
                                crearCampaing({ ...campaing, state: e.target.value })
                            }
                            name="state"
                            id="state"
                        >
                            <option value="" selected disabled>
                            Seleccionar estado
                            </option>
                            {states.map((state, key) => (
                            <option value={state.value} key={key}>
                                {state.nombre}
                            </option>
                            ))}
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
                                     onChange={(e) =>
                                        crearCampaing({ ...campaing, pais: e.target.value })
                                      }
                                        id="pais"
                                        type="text"
                                        className="form-control text-uppercase"
                                        name="pais"
                                        placeholder="Ingrese el pais"
                                        minLength="2"
                                        maxLength="2"
                                        pattern="[A-Z]+[A-Z]"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                    <label className="small text-secondary" htmlFor="users">
                    | Seleccione el Usuario(s) que quiere agregar a la Campaña
                    </label>
                    <div className="input-group mb-3">
                    <div className="input-group-append input-group-text">
                        <i className="fas fa-user-check"></i>
                    </div>
                    {users.map((user, index) => (
                        <div style={{ marginLeft: "5px" }} key={`user-${index}`}>
                        <input
                            onChange={() => userChange(user)}
                            className="form-check-input"
                            type="checkbox"
                            value={user._id}
                            checked={campaing.users.some((c) => c._id === user._id)}
                            style={{
                            marginLeft: "0.03cm",
                            height: "20px",
                            width: "20px",
                            }}
                        />
                        <label
                            style={{ marginLeft: "25px", marginTop: "1px" }}
                            className="form-check-label"
                        >
                            {user.nombres}
                        </label>
                        </div>
                    ))}
                    </div>
                    <div className="invalid-feedback invalid-state"></div>
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
    formData.append("users", JSON.stringify(data.users.map((u) => u._id)));
    
    
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