<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Temas;

class TemasController extends Controller
{
    public function CreateTema(Request $request){
        $tema = Temas::create([
            'nombre'=>$request->nombre
        ]);
        return json_encode($tema);
    }

    public function GetAll(Request $request){
        return json_encode(Temas::all());
    }
}
