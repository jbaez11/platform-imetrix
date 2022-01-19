import React,{useState} from 'react'
//import Swal from 'sweetalert2';
import $ from 'jquery';
import {rutaAPI} from '../../../config/Config';

export default function EditAdmin() {

    /* Hook para caputar los datos del formulario */
    const [administradores, editarAdmin] = useState({
        nombres:"",
        correo:"",
        telefono:"",
        cedula:"",
        password:"",
        state:"",
        nombreEmpresa:"",
        pais:"",
        valorMinuto:"",
        conversacion:""
    });

    //Onchange
    const cambiaFormPost = e =>{
        editarAdmin({
            ...administradores,
            [e.target.name] : e.target.value
        })
    }
    
    //OnSubmit
    const submitPost = async e => {
    
        $(".alert").remove();
    
        e.preventDefault();
    
        //Ejecutamos el servicio put
        const resul = await putData(administradores);
        console.log(administradores)
    
        if(resul.status === 400){
            $(".modal-footer").before(`<div class="alert alert-danger">${resul.mensaje}</div>`)
        } 
        if(resul.status === 200){
            $(".modal-footer").before(`<div class="alert alert-success">${resul.mensaje}</div>`)
            $('button[type="submit"]').remove();
            setTimeout(()=>{window.location.href=`/gestorClientes`},3000);
        }
    }

    //Capturamos los datos para editar el usuario
    $(document).on("click", ".editarInputs", function(e){
        e.preventDefault();
    
        let data = $(this).attr("data").split(",");
        console.log("Data e ditar de Cliente",data);
        $("#editarNombres").val(data[1]);
        $("#editarCorreo").val(data[2]);
        $("#editarTelefono").val(data[3]);
        $("#editarCedula").val(data[4]);
        $("#editarNombreEmpresa").val(data[7]);
        $("#editarState").val(data[6]);
        $("#editarPais").val(data[8]);
        $("#editarValorMinuto").val(data[9]);
        $("#editarConversacion").val(data[10]);
    
        editarAdmin({
            'nombres':  $("#editarNombres").val(),
            'correo':  $("#editarCorreo").val(),
            'telefono':  $("#editarTelefono").val(),
            'cedula':  $("#editarCedula").val(),
            'password':  $("#editarPassword").val(),
            'nombreEmpresa':  $("#editarNombreEmpresa").val(),
            'state':data[6],
            'pais': $("#editarPais").val(),
            'valorMinuto': $("#editarValorMinuto").val(),
            'conversacion':data[10], 
            'id': data[0]
        })
    })
    
    return (
        <div className="modal" id="editarAdmin">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title">EDITAR CLIENTE</h4>
                <button type="button" className="btn-close" data-dismiss="modal"></button>
            </div>
            <form onChange={cambiaFormPost} onSubmit={submitPost}>
            <div className="modal-body">
                        <div className="form-group">
                            <label className="small text-secondary" htmlFor="editarNombres">
                               | Nombres y Apellidos
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-signature"></i>
                                </div>
                                <input
                                    id="editarNombres"
                                    type="text"
                                    className="form-control"
                                    name="nombres"
                                    placeholder="Ingrese nombres y apellidos"
                                    minLength="2"
                                    maxLength="50"
                                    pattern="^[a-zA-ZÀ-ÿ?\s]+"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="small text-secondary" htmlFor="editarCorreo">
                               | Correo
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-signature"></i>
                                </div>
                                <input
                                    id="editarCorreo"
                                    type="email"
                                    className="form-control"
                                    name="correo"
                                    placeholder="Ingrese el correo"
                                    minLength="2"
                                    maxLength="50"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="small text-secondary" htmlFor="editarTelefono">
                               | Telefono Celular
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-signature"></i>
                                </div>
                                <input
                                    id="editarTelefono"
                                    type="text"
                                    className="form-control"
                                    name="telefono"
                                    placeholder="Ingrese el Numero Celular"
                                    minLength="8"
                                    maxLength="15"
                                    pattern="[0-9]{8,15}"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="small text-secondary" htmlFor="editarCedula">
                               | Numero de Documento o NIT
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-signature"></i>
                                </div>
                                <input
                                    id="editarCedula"
                                    type="text"
                                    className="form-control"
                                    name="cedula"
                                    placeholder="Ingrese numero de cedula o NIT"
                                    minLength="7"
                                    maxLength="15"
                                    pattern="[0-9]{7,15}"
                                    required 
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="small text-secondary" htmlFor="editarPassword">
                               | Contraseña:  *Minimo 8 Caracteres, letras en mayúscula, minúscula y números
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-key"></i>
                                </div>
                                <input
                                    id="editarPassword"
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Ingrese la contraseña"
                                    minLength="4"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="small text-secondary" htmlFor="editarState">
                             Habilitado | Inhabilitado
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-key"></i>
                                </div>
                               
                                <select required name="state" id="editarState">
                                        <option selected={administradores.state === "Habilitado"} value="1">Habilitado</option>
                                        <option selected={administradores.state === "Inhabilitado"} value="0">Inhabilitado</option>
                                        
                                </select>
                            </div>
                        </div> 
                        <div className="form-group">
                            <label className="small text-secondary" htmlFor="editarNombreEmpresa">
                               | NOMBRE DE LA EMPRESA
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-signature"></i>
                                </div>
                                <input
                                    id="editarNombreEmpresa"
                                    type="text"
                                    className="form-control"
                                    name="nombreEmpresa"
                                    placeholder="Ingrese el nombre de la Empresa"
                                    minLength="3"
                                    maxLength="20"
                                    pattern="^[a-zA-Z]+( [a-zA-Z]+)*$"
                                    readOnly="readOnly"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="small text-secondary" htmlFor="editarPais">
                            | *Solo con el siguiente formato -- | CO-US-MX
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-signature"></i>
                                </div>
                                <input
                                    id="editarPais"
                                    type="text"
                                    className="form-control text-uppercase"
                                    name="pais"
                                    placeholder="Ingrese el pais"
                                    minLength="2"
                                    maxLength="2"
                                    pattern="[A-Z]+[A-Z]"
                                    readOnly="readOnly"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="small text-secondary" htmlFor="editarValorMinuto">
                               | *Solo con el siguiente formato -- | 0.05
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-signature"></i>
                                </div>
                                <input
                                    id="editarValorMinuto"
                                    type="text"
                                    className="form-control"
                                    name="valorMinuto"
                                    placeholder="Valor a cobrar por Minuto"
                                    pattern="[0-9]+([.][0-9]+)?"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="small text-secondary" htmlFor="editarConversacion">
                               
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-signature"></i>
                                </div>
                                <select required name="conversacion" id="editarConversacion">
                                    <option value="" selected disabled>
                                    Estado de Conversación
                                    </option>
                                    <option value={true}>
                                    Habilitada
                                    </option>
                                    <option value={false}>
                                    Inhabilitada
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                <div className="modal-footer d-flex justify-content-between">
                    <div><button type="submit" className="btn btn-success">Editar</button></div>
                    <div><button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button></div>
                </div>
            </form>
            </div>
        </div>
    </div>
    )
}

//METODO PUT
const putData = data =>{

    const url = `${rutaAPI}/editAdmin/${data.id}`
    const token =  localStorage.getItem("ACCESS_TOKEN");
    if(data.state === "Habilitado") data.state = 1
    else if(data.state === "Inhabilitado") data.state = 0
    const params = {

        method: "PUT",
		body:JSON.stringify(data),
		headers: {

			"Authorization": token,
			"Content-Type": "application/json"
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
