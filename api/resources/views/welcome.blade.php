<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">

    <title>Api Presentación</title>
  </head>
  <body>
    <h1>Rutas:</h1>

    <table class="table container">
        <thead>
            <tr>
            <th scope="col">Método</th>
            <th scope="col">Ruta</th>
            <th scope="col">Descripción</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">GET</th>
                <td>http://localhost/Presentacion/api/public/api/getnotas</td>
                <td>Retorna todas las notas creadas.</td>
            </tr>
            <tr>
                <th scope="row">POST</th>
                <td>http://localhost/Presentacion/api/public/api/crenota</td>
                <td>Crea una nota.</td>
            </tr>
            <tr>
                <th scope="row">GET</th>
                <td>http://localhost/Presentacion/api/public/api/getnotcorreo</td>
                <td>Retorna las notas creadas por una sola persona mediante el correo.</td>
            </tr>
            <tr>
                <th scope="row">DELETE</th>
                <td>http://localhost/Presentacion/api/public/api/delnota</td>
                <td>Elimina una nota seleccionada</td>
            </tr>
            <tr>
                <th scope="row">PUT</th>
                <td>http://localhost/Presentacion/api/public/api/upnota/{id}</td>
                <td>Actualiza una nota seleccionada por el id.</td>
            </tr>
            
        </tbody>
    </table>


    <!-- Optional JavaScript; choose one of the two! -->

    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>

    <!-- Option 2: Separate Popper and Bootstrap JS -->
    <!--
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js" integrity="sha384-SR1sx49pcuLnqZUnnPwx6FCym0wLsk5JZuNx2bPPENzswTNFaQU1RDvt3wT4gWFG" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.min.js" integrity="sha384-j0CNLUeiqtyaRmlzUHCPZ+Gy5fQu0dQ6eZ/xAww941Ai1SxSY+0EQqNXNE6DZiVc" crossorigin="anonymous"></script>
    -->
  </body>
</html>
