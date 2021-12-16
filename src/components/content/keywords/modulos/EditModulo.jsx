import React,{useState, useEffect} from 'react'
import $ from 'jquery';
import Swal from 'sweetalert2';
import {rutaAPITableros} from '../../../../config/Config';



export default function EditModulo(){

    const valores = window.location.href;
    let nuevaURL = valores.split("/");
    /* Hook para caputar los datos del formulario */
    const [modulos, editarModulo] = useState({
        name:"",
        categoria:""
    });

     /* Onchange */
     const cambiaFormPost = e =>{
        editarModulo({
            ...modulos,
            [e.target.name] : e.target.value
        })
    }

    /* OnSubmit */
    const submitPost = async e => {

        $(".alert").remove();
    
        e.preventDefault();
    
        //Ejecutamos el servicio post
        const resul = await putData(modulos);
        // const resultData = await getData();
        // console.log("Datos de Clusters", resultData.data);
    
        if(resul.status === 400){
            $(".modal-footer").before(`<div class="alert alert-danger">${resul.mensaje}</div>`)
        } 
        if(resul.status === 200){
            $(".modal-footer").before(`<div class="alert alert-success">${resul.mensaje}</div>`)
            $('button[type="submit"]').remove();
            setTimeout(()=>{window.location.href=`/moduloKeywords/`+nuevaURL[4]},3000);
        }
    }

    const [categorias , setCategorias] = React.useState([]);

    React.useEffect(() => {
        //console.log('useEffect');
        obtenerDatos();
    }, [])

    const obtenerDatos = async ()=>{
        const data = await fetch(`${rutaAPITableros}/igsSufiCO/getCategorias`);
        const categoria =  await data.json()
        console.log("Categorias", categoria.data);
        setCategorias(categoria.data)
    }

    //Capturamos los datos para editar el usuario
    $(document).on("click", ".editarInputs", async function(e){
        
        e.preventDefault();

        let data = $(this).attr("data").split(",");
        //console.log(data);
        $("#editarNombre").val(data[1]);
        $("#editarCategoria").val(data[2]);

 

        editarModulo({
            'name':  $("#editarNombre").val(),
            'cluster':  $("#editarCategoria").val(),
            'id': data[0]
        })
    })

    //Capturamos los datos para borrar el usuario
    $(document).on("click", ".borrarInput", function(e){
        e.preventDefault();
        
        let data = $(this).attr("data").split(",")[0];
        console.log(data);
    
        //Validamos si queremos eliminar el usuario
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
                const borrarUsuario = async () =>{
                    const result = await deleteData(data);
        
                    if(result.status === 400){
        
                        Swal.fire({
                            type: "error",
                            title: result.mensaje,
                            showConfirmButton: true,
                            confirmButtonText: "Cerrar"
                        }).then(function(result){
                                if(result.isConfirmed) {window.location.href=`/moduloKeywords/`+nuevaURL[4]}
                            })
                    } 
                    if(result.status === 200){
        
                        Swal.fire({
                            type: "success",
                            title: result.mensaje,
                            showConfirmButton: true,
                            confirmButtonText: "Cerrar"
                        }).then(function(result){
                            if(result.isConfirmed) {window.location.href=`/moduloKeywords/`+nuevaURL[4]}
                            })
                    }
                }
                borrarUsuario();
            }
        })
    
    })

    return(

        <div className="modal" id="editModulo">
        <div className="modal-dialog">
            <div className="modal-content">

            <div className="modal-header">
                <h4 className="modal-title">Editar Modulo</h4>
                <button type="button" className="btn-close" data-dismiss="modal"></button>
            </div>
            <form onChange={cambiaFormPost} onSubmit={submitPost}>
                <div className="modal-body">
                    <div className="form-group">
                        <label className="small text-secondary" htmlFor="editarNombre">
                            *Mínimo 2 Caracteres, máximo 20, Sin números
                        </label>
                        <div className="input-group mb-3">
                            <div className="input-group-append input-group-text">
                                <i className="fas fa-signature"></i>
                            </div>
                            <input
                                id="editarNombre"
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Ingrese el nombre del modulo"
                                minLength="2"
                                maxLength="20"
                                pattern="(?=.*[A-Za-z]).{2,20}"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                         <label className="small text-secondary" htmlFor="editarCategoria">
                            | Seleccione la categoria para el modulo
                        </label>
                        <div className="input-group mb-3">
                            <div className="input-group-append input-group-text">
                                <i className="fas fa-address-card"></i>
                            </div>
                            <select name="categoria" id="editarCategoria">
                            <option value="" selected disabled>Seleccionar Categoria</option>
                            {categorias.map((categoria, index)=>(
                                <>
                                <option value={categoria._id}>{categoria.name}</option>
                                </>
                            ))}
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
    );
}

/* METODO PUT PARA EDITAR */
const putData = data =>{
   
    const url = `${rutaAPITableros}/igsSufiCO/editModulo/${data.id}`;
    const token =  localStorage.getItem("ACCESS_TOKEN");
    const params = {

        method: "PUT",
		body:JSON.stringify(data),
		headers: {

			"Content-Type": "application/json"

		}

    }
    console.log("Data a guardar del Modulo a Editar", data)
    return fetch(url, params).then(response=>{
        return response.json();
    }).then(result=>{
        return result;
    }).catch(err=>{
        return err;
    });
}

/* METODO DELETE */
const deleteData = data =>{
    const url = `${rutaAPITableros}/igsSufiCO/deleteModulo/${data}`
    const token =  localStorage.getItem("ACCESS_TOKEN");
    const params = {

        method: "DELETE",
		headers: {

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