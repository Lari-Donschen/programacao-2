<?php
header('Content-Type: application/json');

function Salvar($descricao, $titulo, $autor){
    $connection = require("dbfactory.php");                        
    if ($connection -> 
        query("INSERT INTO livro (descricao, titulo, autor) VALUES ('$descricao', '$titulo', '$autor')")) {                 
    }
    $connection -> close();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $postData = json_decode(file_get_contents('php://input', true));
    if(!empty($postData->descricao) && !empty($postData->titulo) && !empty($postData->autor)){
        Salvar($postData->descricao, $postData->titulo, $postData->autor);
    }        
}
else {
    $response['body'] = json_encode([
            'error' => 'Invalid input'
        ]);
    echo $response;
}
?>