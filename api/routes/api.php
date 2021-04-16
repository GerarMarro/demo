<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('getnotas', 'App\Http\Controllers\NotasController@GetNotas');
Route::post('crenota', 'App\Http\Controllers\NotasController@CreateNota');
Route::get('getnotcorreo', 'App\Http\Controllers\NotasController@GetNotasxCorreo');
Route::delete('delnota', 'App\Http\Controllers\NotasController@DeleteNota');
Route::put('upnota/{id}', 'App\Http\Controllers\NotasController@UpdateNota');

Route::get('gettemas', 'App\Http\Controllers\TemasController@GetAll');
Route::post('cretema', 'App\Http\Controllers\TemasController@CreateTema');