import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2';
import $ from 'jquery';
import {rutaAPI} from '../../../config/Config';

export default function EditUser(){

    const currentUserId = localStorage.getItem("ID");
    const valores = window.location.href;
    let nuevaURL = valores.split("/");

    const [clusters , setClusters] = React.useState([]);

    React.useEffect(() => {
        //console.log('useEffect');
        obtenerDatos();
    }, [])

    React.useEffect(() => {
        //console.log('useEffect');
        obtenerDatosCampañas();
    }, [])

    const obtenerDatos = async ()=>{
        const data = await fetch(`${rutaAPI}/getCluster/${nuevaURL[4]}`);
        const clust =  await data.json()
        for(let i in clust.data){
            let c = clust.data[i]
            let respuesta = await fetch(`${rutaAPI}/getCampaing/${c._id}`);
            clust.data[i].campaings = (await respuesta.json()).data
        }
        //console.log("cluster",clust.data);
        setClusters(clust.data)
    }

    const obtenerDatosCampañas = async ()=>{
        
        const data = await fetch(`${rutaAPI}/getCampaing/${nuevaURL[4]}`);
        const campaing =  await data.json()
        //console.log("cluster",clust.data);
        setClusters(campaing.data)
    }


/*     const clusterChange = cluster =>{
        let nClusters = usuarios.clusters
        let index = nClusters.findIndex(c => c._id === cluster._id)
        if(index !== -1){
            nClusters.splice(index, 1)
        }else{
            nClusters.push(cluster)
        }
        editarUsuario({
            ...usuarios,
            clusters: nClusters
        })
        console.log("Clusters",usuarios)
    }

    const campaingChange = campaing =>{
        let nCampaings = usuarios.campaings
        let index = nCampaings.findIndex(c => c._id === campaing._id)
        if(index !== -1){
            nCampaings.splice(index, 1)
        }else{
            nCampaings.push(campaing)
        }
        editarUsuario({
            ...usuarios,
            campaings: nCampaings
        })
        console.log("Campañas",usuarios)
    }

    let checkedSelectedCluster = cluster =>{
        return usuarios.clusters.some(c => c._id == cluster._id)
    } */

    //Hook para caputar los datos del formulario
    const [usuarios, editarUsuario] = useState({
        nombres:"",
        user:"",
        password:"",
        state:"",
        clusters:[],
        campaings:[],
        role:"",
        id:""
    });

    //Onchange
    const cambiaFormPost = e =>{

        editarUsuario({
            ...usuarios,
            [e.target.name] : e.target.value
        })
    }

    
    //OnSubmit
    const submitPost = async e => {

        $(".alert").remove();

        e.preventDefault();

        //console.log(usuarios);

        //Ejecutamos el servicio put
        const result = await putData(usuarios);

        if(result.status === 400){
            $(".modal-footer").before(`<div class="alert alert-danger">${result.mensaje}</div>`)
        } 
        if(result.status === 200){
            $(".modal-footer").before(`<div class="alert alert-success">${result.mensaje}</div>`)
            $('button[type="submit"]').remove();
            setTimeout(()=>{window.location.href=`/usuarios/${currentUserId}`},2000);
        }
    
    }

    //Capturamos los datos para editar el usuario
    $(document).on("click", ".editarInputs", async function(e){
        
        e.preventDefault();

        let data = $(this).attr("data").split(",");
        //console.log(data);
        $("#editarNombre").val(data[1]);
        $("#editarUsuario").val(data[2]);
        $("#editarState").val(data[3]);
        $("#editarCluster").val(data[4]);
        $('#editCampaings').val(data[5])
        $("#editarRole").val(data[6]);

        let user = await getUsers(data[0]);
        let nClusters = []
        let nCampaings = []
        if(user.data instanceof Array){
            const userClusters = user.data.map(u => u._id)
            //console.log("CLUSTERS", userClusters)
            nClusters = clusters.filter(c => userClusters.includes(c._id))
        }
        if(user.data instanceof Array){
            const userCampaings = user.data.map(u => u._id)
            nCampaings = clusters.filter(c => userCampaings.includes(c._id))
        }

        editarUsuario({
            'nombres':  $("#editarNombre").val(),
            'user':  $("#editarUsuario").val(),
            'password':  $("#editarPassword").val(),
            'state':  $("#editarState").val(),
            'clusters': nClusters,
            'campaings': nCampaings,
            'role':  $("#editarRole").val(),
            'id': data[0]
        })
    })

        //Capturamos los datos para borrar el usuario
       /*  $(document).on("click", ".borrarInput", function(e){
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
                                    if(result.isConfirmed) {window.location.href=`/usuarios/${currentUserId}`}
                            })
                        } 
                        if(result.status === 200){

                            Swal.fire({
                                type: "success",
                                title: result.mensaje,
                                showConfirmButton: true,
                                confirmButtonText: "Cerrar"
                                }).then(function(result){
                                    if(result.isConfirmed) {window.location.href=`/usuarios/${currentUserId}`}
                            })
                        }
                    }
                    borrarUsuario();
                }
              })

        }) */
    

    return(

        <div className="modal" id="editarAdmin">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Editar Usuario</h4>
                    <button type="button" className="btn-close" data-dismiss="modal"></button>
                </div>
                <form onChange={cambiaFormPost} onSubmit={submitPost}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="small text-secondary" htmlFor="editarNombre">
                                *Mínimo 2 Caracteres, máximo 50, Sin números
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-user"></i>
                                </div>
                                <input
                                    id="editarNombre"
                                    type="text"
                                    className="form-control text-lowercase"
                                    name="nombres"
                                    placeholder="Ingrese el Nombre"
                                    minLength="2"
                                    maxLength="50"
                                    pattern="(?=.*[A-Za-z]).{2,50}"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="small text-secondary" htmlFor="editarUsuario">
                                *Minimo 2 Caracteres, Maximo 20
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-user"></i>
                                </div>
                                <input
                                    id="editarUsuario"
                                    type="email"
                                    className="form-control"
                                    name="correo"
                                    placeholder="Ingrese el Correo"
                                    minLength="2"
                                    maxLength="40"
                                    pattern="(?=.*[A-Za-z]).{2,40}"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="small text-secondary" htmlFor="editarPassword">
                                *Minimo 8 Caracteres, letras en mayúscula, minúscula y números
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
                                <select name="state" id="editarState">
                                        <option value="" selected disabled hidden>Seleccionar estado</option>
                                        <option value="1">Habilitado</option>
                                        <option value="0">Inhabilitado</option>
                                </select>
                            </div>
                        </div>
                        {/* <div className="form-group">
                            <label className="small text-secondary" htmlFor="editarCluster">
                                *Solo se permite el id del cluster a asociar
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-key"></i>
                                </div>
                                  {clusters.map((cluster, index)=>(
                                    <div style={{marginLeft:"5px"}} key={`cluster-${index}`}>
                                        <input onChange={()=>clusterChange(cluster)} 
                                        type="checkbox" 
                                        value={cluster._id} 
                                        className="form-check-input"
                                        checked={usuarios.clusters.some(c => c._id === cluster._id)} 
                                        style={{marginLeft:"0.03cm", height:"18px", width:"18px", marginTop:"5px"}}/>
                                        <label style={{marginLeft:"25px"}} 
                                        className="form-check-label">{cluster.nombre}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {clusters.map((cluster, index) =>(
                            <>
                            {checkedSelectedCluster(cluster) && 
                                    <div> 
                                         <h5>{cluster.nombre}</h5>
                                         <div className="form-group">
                                         <label className="small text-secondary" htmlFor="editCampaings">
                                         | Seleccione las campaña(s) al que el auditor tendra acceso
                                         </label>
                                         <div className="input-group mb-3">
                                             <div className="input-group-append input-group-text">
                                             <i className="fas fa-address-card"></i>
                                         </div>
                                         {cluster.hasOwnProperty("campaings") && cluster.campaings.map((campaing, index)=>(
                                             <div style={{marginLeft:"5px"}} key={`campaing-${index}`}>
                                                 <input onChange={()=>campaingChange(campaing)} className="form-check-input" type="checkbox" value={campaing._id} checked={usuarios.campaings.some(c => c._id === campaing._id)} style={{marginLeft:"0.03cm", height:"20px", width:"20px"}} />
                                                 <label style={{marginLeft:"25px", marginTop:"1px"}} className="form-check-label">{campaing.nombre}</label>
                                             </div>
                                         ))}
                                         </div>
                                         </div> 
                                    </div>}
                            </>
                        ))}
                                     */}
                        <div className="form-group">
                            <label className="small text-secondary" htmlFor="editarRole">
                                |Auditor
                            </label>
                            <div className="input-group mb-3">
                                <div className="input-group-append input-group-text">
                                    <i className="fas fa-user"></i>
                                </div>
                                <select name="role" id="editarRole">
                                        <option value="" selected disabled hidden>Seleccionar rol</option>
                                        <option hidden value="Administrador">Administrador</option>
                                        <option value="Auditor">Auditor</option>
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

//METODO PUT
const putData = data =>{
    const url = `${rutaAPI}/editUser/${data.id}`
    const token =  localStorage.getItem("ACCESS_TOKEN");
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

//Petición Get para Usuarios asociados al Administrador
const getUsers = (userID) =>{

    const valores = window.location.href;
    //let nuevaURL = valores.split("/");

    const url = `${rutaAPI}/getCluster/${userID}`;
    const token = localStorage.getItem("ACCESS_TOKEN");

    const params = {
        method: "GET",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    } 
    return fetch(url, params).then(response =>{
        return response.json();
    }).then(result => {
        return result;
    }).catch(err=>{
        return err;
    })

}

//METODO DELETE
const deleteData = data =>{
    const url = `${rutaAPI}/deleteUser/${data}`
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