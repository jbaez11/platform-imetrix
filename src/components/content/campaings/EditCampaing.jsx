import React,{useState} from 'react'
import Swal from 'sweetalert2';
import notie from'notie';
import $ from 'jquery';
import {rutaAPI} from '../../../config/Config';

export default function EditCampaing(){

    const valores = window.location.href;
    let nuevaURL = valores.split("/");
    
    //HOOK para Capturar los Datos de la campaña a editar
    const [campaing, editCampaing] = useState({
        nombre:"",
        foto: null,
        state: "",
        cluster: "",
        id:""
    })

    //OnChange
    const cambiaFormPut = e => {

        if($("#editFoto").val()){

            let foto = $("#editFoto").get(0).files[0];
            //Validamos el Formato de la imagen
            if(foto["type"] !== "image/jpeg" && foto["type"] !== "image/png"){
                $("#editFoto").val("");
                notie.alert({
                    type:3,
                    text:"¡ERROR: La foto debe estar en formato JPG o PNG!",
                    time: 3,
                    position: 'bottom'
                })
                $(".previsualizarImg").attr("src", "");
                return;
            }else if(foto["size"] > 10000000){
                $("#editFoto").val("");
                alert('¡ERROR: La foto no debe pesar mas de 3MB!');
                $(".previsualizarImg").attr("src", "");
                return;
            }else{
                let datosFoto = new FileReader();
                datosFoto.readAsDataURL(foto);

                $(datosFoto).on("load", function(event){
                    let rutaFoto = event.target.result;
                    $(".previsualizarImg").attr("src", rutaFoto);

                    editCampaing({
                        'nombre': $("#editNombre").val(), 
                        'foto': foto,
                        'state': $("#editState").val(),
                        // 'cluster': $("#editCluster").val(),
                        'id': $("#editId").val()
                    })
                })        
            }
        }else{

            editCampaing({
                'nombre': $("#editNombre").val(), 
                'foto': null,
                'state': $("#editState").val(),
                // 'cluster': $("#editCluster").val(),
                'id': $("#editId").val()
            })
        }   
    }

    //OnSubmit
    const submitPut = async e => {
        $('.alert').remove();
        e.preventDefault();

        const result = await putData(campaing);
        console.log("Datos Nuevos",campaing)

        if(result.status === 400){
            $(".modal-footer").before(`<div class="alert alert-danger">${result.mensaje}</div>`)
        } 
        if(result.status === 200){
            $(".modal-footer").before(`<div class="alert alert-success">${result.mensaje}</div>`)
            $('button[type="submit"]').remove();
            setTimeout(()=>{window.location.href="/campañas/"+nuevaURL[4]},2000);
        }
    
    }

    //Capturar datos para editar
    $(document).on("click", ".editarInputs", function(e){
        e.preventDefault();
        let data = $(this).attr("data").split(",");
        console.log("Datos para Editar",data);
        $("#editNombre").val(data[1]);
        $(".previsualizarImg").attr("src", `${rutaAPI}/getImgCampaing/${data[2]}`);
        $("#editState").val(data[3]);
        // $("#editCluster").val(data[4]);
        $("#editId").val(data[0]);

        editCampaing({

            'nombre': data[1], 
            'foto': null,
            'state': data[3],
            // 'cluster': data[4],
            'id': data[0]
            
        })
        
    })

    //Capturar los datos para borrar la campaña
    $(document).on("click", ".borrarInput", function(e){
        e.preventDefault();
        let data = $(this).attr("data").split(",")[0];

         //Validamos si queremos elemininar el usuario
         Swal.fire({

            title: '¿Está seguro de eliminar este registro?',
            text: "Esta acción no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, eliminar registro!'

        }).then((result) => {

            if (result.isConfirmed) {

                //Ejecutamos el servicio delete
                const borrarCampaing = async () =>{
                    const result = await deleteData(data);

                    if(result.status === 400){

                        Swal.fire({
                            type: "error",
                            title: result.mensaje,
                            showConfirmButton: true,
                            confirmButtonText: "Cerrar"
                            }).then(function(result){
                                if(result.isConfirmed) {window.location.href="/campañas/"+nuevaURL[4]}
                        })
                    } 
                    if(result.status === 200){

                        Swal.fire({
                            type: "success",
                            title: result.mensaje,
                            showConfirmButton: true,
                            confirmButtonText: "Cerrar"
                            }).then(function(result){
                                if(result.isConfirmed) {window.location.href="/campañas/"+nuevaURL[4]}
                        })
                    }
                }
                borrarCampaing();
            }
          })
    

    })

    return(

        <div className="modal" id="editCampaing">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Editar Campaña</h4>
                    <button type="button" className="btn-close" data-dismiss="modal"></button>
                </div>
                <form onChange={cambiaFormPut} onSubmit={submitPut} encType="multipart/form-data">
                    <div className="modal-body">
                        <input type="hidden" id="editId"/>
                        <div className="form-group">
                            <label className="small text-secondary" htmlFor="editNombre">
                                *Min. 2 Caracteres | Max. 20 | Sin caracteres especiales.
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-signature"></i>
                                </div>
                                <input
                                    id="editNombre"
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
                            <label className="small text-secondary" htmlFor="editFoto">
                                    *Peso Max. 3MB | Formato: JPG o PNG</label>
                            <input
                                id="editFoto"
                                type="file"
                                className="form-control-file border"
                                name="foto"
                            />
                            <div className="invalid-feedback invalid-foto"></div>
                            <img className="previsualizarImg img-fluid" alt=""/>
                        </div>
                        <div className="form-group">
                            <label className="small text-secondary" htmlFor="editState">
                                *1* Habilitado | *0* Inhabilitado
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-user-check"></i>
                                </div>
                                <select name="state" id="editState">
                                        <option value="1">Habilitado</option>
                                        <option value="0">Inhabilitado</option>
                                </select>
                            </div>
                            <div className="invalid-feedback invalid-state"></div>
                        </div>
                        {/* <div hidden className="form-group">
                            <label className="small text-secondary" htmlFor="editCluster">
                                *Solo se permite el ID del cluster a asociar
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-user-check"></i>
                                </div>
                                <input
                                    id="editCluster"
                                    type="text"
                                    className="form-control"
                                    name="cluster"
                                    placeholder="Ingrese el ID cluster"
                                    minLength="24"
                                    maxLength="24"
                                    pattern="(?=.*\d).{24,24}" 
                                    required
                                />
                            </div>
                            <div className="invalid-feedback invalid-state"></div>
                        </div> */}
                    </div>
                    <div className="modal-footer d-flex justify-content-between">
                        <div><button type="submit" className="btn btn-primary">Editar</button></div>
                        <div><button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button></div>
                    </div>
                </form>
            </div>
        </div>
    </div>  
    );
}


//PETICION PUT PARA CAMPAÑAS
const putData = data =>{
    const url = `${rutaAPI}/editCampaing/${data.id}`
    const valores = window.location.href;
    let nuevaURL = valores.split("/");
    data.cluster = nuevaURL[4];
    let formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("foto", data.foto);
    formData.append("state", data.state);
    formData.append("cluster", data.cluster);
    const token =  localStorage.getItem("ACCESS_TOKEN");
    const params = {

        method: "PUT",
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

//METODO DELETE
const deleteData = data =>{
    const url = `${rutaAPI}/deleteCampaing/${data}`
    const token =  localStorage.getItem("ACCESS_TOKEN");
    const params = {

        method: "DELETE",
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