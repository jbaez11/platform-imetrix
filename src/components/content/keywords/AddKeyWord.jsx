import React,{useState, useEffect} from 'react'
import $ from 'jquery';
import {rutaAPITableros} from '../../../config/Config';



export default function AddKeyWord(){

    /* Hook para caputar los datos del formulario */
    const [keywords, crearKeyWord] = useState({
        name:"",
        cluster:""
    });

     /* Onchange */
     const cambiaFormPost = e =>{
        crearKeyWord({
            ...keywords,
            [e.target.name] : e.target.value
        })
    }

    /* OnSubmit */
    const submitPost = async e => {

        $(".alert").remove();
    
        e.preventDefault();
    
        //Ejecutamos el servicio post
        const resul = await postData(keywords);
        // const resultData = await getData();
        // console.log("Datos de Clusters", resultData.data);
    
        if(resul.status === 400){
            $(".modal-footer").before(`<div class="alert alert-danger">${resul.mensaje}</div>`)
        } 
        if(resul.status === 200){
            $(".modal-footer").before(`<div class="alert alert-success">${resul.mensaje}</div>`)
            $('button[type="submit"]').remove();
            setTimeout(()=>{window.location.href=`/keywords`},3000);
        }
    }

    const [clusters , setClusters] = React.useState([]);

    React.useEffect(() => {
        //console.log('useEffect');
        obtenerDatos();
    }, [])

    const obtenerDatos = async ()=>{
        const data = await fetch(`${rutaAPITableros}/igsSufiCO/getClusters`);
        const clust =  await data.json()
        console.log("cluster",clust.data);
        setClusters(clust.data)
    }    

    return(

        <div className="modal" id="addKeyWord">
        <div className="modal-dialog">
            <div className="modal-content">

            <div className="modal-header">
                <h4 className="modal-title">Crear KeyWord</h4>
                <button type="button" className="btn-close" data-dismiss="modal"></button>
            </div>
            <form onChange={cambiaFormPost} onSubmit={submitPost}>
                <div className="modal-body">
                    <div className="form-group">
                        <label className="small text-secondary" htmlFor="name">
                            *Mínimo 2 Caracteres, máximo 50, Sin números
                        </label>
                        <div className="input-group mb-3">
                            <div className="input-group-append input-group-text">
                                <i className="fas fa-signature"></i>
                            </div>
                            <input
                                id="name"
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Ingrese la KeyWord/Frase"
                                minLength="2"
                                maxLength="50"
                                pattern="(?=.*[A-Za-z]).{2,50}"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                         <label className="small text-secondary" htmlFor="cluster">
                            | Seleccione el cluster para la KeyWord
                        </label>
                        <div className="input-group mb-3">
                            <div className="input-group-append input-group-text">
                                <i className="fas fa-address-card"></i>
                            </div>
                            <select name="cluster" id="cluster">
                            <option value="" selected disabled>Seleccionar Cluster</option>
                            {clusters.map((cluster, index)=>(
                                <>
                                <option value={cluster._id}>{cluster.name}</option>
                                </>
                            ))}
                            </select>
                        </div>
                    </div> 
                </div>
                <div className="modal-footer d-flex justify-content-between">
                    <div><button type="submit" className="btn btn-success">Crear</button></div>
                    <div><button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button></div>
                </div>
            </form>
            </div>
        </div>
    </div>
    );
}

//PETICION POST PARA USUARIOS
const postData = data =>{
   
    const url = `${rutaAPITableros}/igsSufiCO/addKeyword`;
    const token =  localStorage.getItem("ACCESS_TOKEN");
    const params = {

        method: "POST",
		body:JSON.stringify(data),
		headers: {

			"Content-Type": "application/json"

		}

    }
    console.log("Data a guardar de KeyWords", data)
    return fetch(url, params).then(response=>{
        return response.json();
    }).then(result=>{
        return result;
    }).catch(err=>{
        return err;
    });
}