<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notas;
use App\Models\Temas;

class NotasController extends Controller
{
    /**
     * Códigos:
     * 1001: No hay datos
     * 1002: Nota eliminada
    */


    //Obtener todas las notas
    public function GetNotas(){

        $notas = Notas::all();
        return json_encode($notas);

    }

    //Crea la nota
    public function CreateNota(Request $request){
        
        /**En este caso utilizaremos el correo como 
         * parámetro para busqueda de información
         * por esa razón eetará encriptado
         * con md5 
         */

        //MD5 encriptación
        $correo = md5($request->correo);

        //Comprobamos si el tema existe
        $tema = Temas::where('_id', '=', $request->tema)->first();
        
        if ($tema == null) {
            $tema = Temas::create([
                'nombre'=>$request->tema
            ]);
        }

        //Se crea la nota ingresando campo por campo
        $nota = Notas::create([
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            'correo' => $correo,
            'tema' => $tema->_id
        ]);

        //Retorno la nota creada
        return json_encode($nota);
    }

    //Obtengo notas por correo
    public function GetNotasxCorreo(Request $request){
        
        //Encriptar el correo
        $correo = md5($request->correo);

        //Busqueda de nota por correo
        $notas = Notas::where('correo', '=', $correo)->get();

        //Retorna valores
        if($notas == null){
            
            //En caso de que no se encuentre ninguno retorna 1001
            return json_encode(1001);
        }else{
            foreach ($notas as $n) {
                $n->asunto = $n->Asunto;
                
            }
            //En caso contrario retorna las notas
            return json_encode($notas);
        }
    }

    //Eliminar la nota
    public function DeleteNota(Request $request){
        $nota = Notas::where('_id', '=', $request->id)->first();
        $nota->delete();
        return json_encode(1002);
    }

    //Modificar nota 
    public function UpdateNota(Request $request, $id){
        
        $nota = Notas::where('_id', '=', $id)->first();
        
        if ($nota != null) {
            $nota->titulo = $request->titulo;
            $nota->descripcion = $request->descripcion;
            $nota->save();
            return json_encode($nota);
        }else{
            return json_encode(1001);
        }
        
    }
}
