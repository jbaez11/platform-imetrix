import React,{useState} from 'react'
import {rutaAPI} from '../../../config/Config';
import $ from 'jquery';
import notie from 'notie';
import 'notie/dist/notie.css';
import { useEffect } from 'react';

export default function AddCluster(){

    
    const currentUserId = localStorage.getItem("ID");

    const [users, setUsers] = React.useState([]);

    const [states, setStates] = React.useState([
        {
            nombre: "habilitado",
            value: "1"
        },
        {
            nombre:"Inhabilitado",
            value: "0"
        }
    ]);

    React.useEffect(() => {
        obtenerUsuarios();
    }, [])

    const obtenerUsuarios = async () =>{
        const data = await fetch(`${rutaAPI}/getUser/${currentUserId}`);
        const user = await data.json()
        //console.log("Admin Users", user.data)
        setUsers(user.data);
        console.log("Users", user.data)
    }

    /* Users on Change */
    const userChange = user => {
        let nUsers = cluster.users
        let index = nUsers.findIndex(c => c._id === user._id)
        if(index !== -1){
            nUsers.splice(index, 1)
        }else{
            nUsers.push(user)
        }
        crearCluster({
            ...cluster,
            users: nUsers
        })
        console.log("Usuarios para el Cluster", cluster)
    }

    //HOOK para Capturar los Datos del formulario
    const [cluster, crearCluster] = useState({
        nombre:"",
        foto: null,
        state: "",
        users: []
    })

    useEffect(()=>{
        console.log("Actualización de Cluster", cluster)
    }, [cluster])

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

            $(datosFoto).one("load",  function(event) {

                let rutaFoto = event.target.result;
                $(".previsualizarImg").attr("src", rutaFoto);

                crearCluster({
                    ...cluster,
                    foto,
                    'state': $("#state").val()
                })
                
            })        
        }
    }

    //OnSubmit
    const submitPost = async e =>{
        $('.alert').remove();
        e.preventDefault();
       /*  const {nombre, foto, state} = cluster;

        if(nombre === ""){
            $(".invalid-nombre").show();
            $(".invalid-nombre").html("El nombre del Cluster no puede ir Vacio!");
        }
        //Validamos si la foto viene vacia
        if(foto === null){
            $(".invalid-foto").show();
            $(".invalid-foto").html("La foto no puede ir vacia!");

            return;
        }
        if(state === ""){
            $(".invalid-state").show();
            $(".invalid-state").html("El estado del Cluster no puede ir Vacio!");
        } */

        //Ejecutamos el servicio post
        const result = await postData(cluster);
        console.log("Datos a Guardar", cluster)
        if(result.status === 400){
            $(".modal-footer").before(`<div class="alert alert-danger">${result.mensaje}</div>`)
        } 
        if(result.status === 200){
            $(".modal-footer").before(`<div class="alert alert-success">${result.mensaje}</div>`)
            $('button[type="submit"]').remove();
            setTimeout(()=>{window.location.href=`/clusters/${currentUserId}`},2000);
        }
    }

    //Limpiar formulario
    $(document).on("click", ".limpiarFormulario", function(){
        $('.modal').find('form')[0].reset();
        $('.previsualizarImg').attr("src","");
    })

    return(
        <div className="modal" id="addCluster">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Crear Cluster</h4>
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
                                        onChange={(e) => crearCluster({...cluster,nombre: e.target.value})}
                                        id="nombre"
                                        type="text"
                                        className="form-control text-uppercase"
                                        name="nombre"
                                        placeholder="Ingrese el nombre del Cluster"
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
                                    <select onChange={(e) => crearCluster({...cluster,state: e.target.value})} 
                                    name="state" 
                                    id="state">
                                        <option value="" selected disabled>Seleccionar estado</option>
                                        {states.map((state, key) => (
                                            <option value={state.value} key={key} >{state.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="invalid-feedback invalid-state"></div>
                            </div>
                            <div  className="form-group">
                                <label className="small text-secondary" htmlFor="users">
                                    | Seleccione el Usuario(s) que quiere agregar al cluster
                                </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-append input-group-text">
                                        <i className="fas fa-user-check"></i>
                                    </div>
                                    {users.map((user, index) =>(
                                        <div style={{marginLeft:"5px"}} key={`user-${index}`}>
                                            <input onChange={ () => userChange(user)}
                                            className="form-check-input"
                                            type="checkbox" 
                                            value={user._id}
                                            checked={cluster.users.some(c => c._id === user._id)}
                                            style={{marginLeft:"0.03cm", height:"20px", width:"20px"}}
                                            />
                                            <label style={{marginLeft:"25px", marginTop:"1px"}} 
                                                className="form-check-label">{user.nombres}
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

//PETICION POST PARA CLUSTERS
const postData = data =>{
    const currentUserId = localStorage.getItem("ID");
    data.createdBy = currentUserId;
    const url = `${rutaAPI}/addCluster`
    let formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("foto", data.foto);
    formData.append("state", data.state);
    formData.append("users", JSON.stringify(data.users.map(u => u._id)));
    formData.append("createdBy", data.createdBy);
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