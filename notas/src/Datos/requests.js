import { crenota, getnotcorreo, gettemas, cretema, delnota, upnota } from './rutas';
import axios from 'axios';

export function NotaxCorreo(data){
    
    return axios.get(getnotcorreo, {
        params:{
            correo: data.correo,
        }
    })
}

export function getTemas(){
    
    return axios.get(gettemas)
}

export function CreateNota(data, asunto){
    if (data.asunto === "") {
        console.log(asunto);
        return axios.post(crenota, {
            titulo: data.titulo,
            descripcion: data.descripcion,
            correo: data.correo,
            tema: asunto
        })
    }else{
        console.log(data);
        return axios.post(crenota, {
            titulo: data.titulo,
            descripcion: data.descripcion,
            correo: data.correo,
            tema: data.asunto
        })
    }
    
}

export function CreateTema(data){
    return axios.post(cretema, {
        nombre: data
    })
}

export function DeleteNota(id){
    return axios.delete(delnota, {
        data:{
            id: id
        }
    })
}

export function UpdateNota(id, data, viejo){
    if (data.descripcion === "") {
        data.descripcion = viejo.descripcion;
    }
    if (data.titulo === "") {
        data.titulo = viejo.titulo;
    }
    return axios.put(upnota +"/"+id, {
        titulo: data.titulo,
        descripcion: data.descripcion
    })
}