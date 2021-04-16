<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model as Model;

class Temas extends Model
{
    protected $connection = 'mongodb';
	protected $collection = 'TEMAS';

    protected $fillable = [
        'nombre'
    ];
    
    public function temas(){
        return $this->hasMany(Notas::class, 'tema', '_id');
    }
}
