<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model as Model;
use App\Models\Temas;

class Notas extends Model
{
    protected $connection = 'mongodb';
	protected $collection = 'NOTAS';

    protected $fillable = [
        'titulo', 'tema', 'descripcion', 'correo'
    ];

    public function Asunto(){
        return $this->hasMany(Temas::class, '_id', 'tema');
    }
}
