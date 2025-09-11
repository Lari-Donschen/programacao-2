<?php
header('Content-Type: application/json');

function Salvar($nome, $cep, $endereco){
    $connection = require("dbfactory.php");                        
    if ($connection -> 
        query(@"INSERT INTO local (nome, cep, endereco) VALUES ('$nome', '$cep', '$endereco');")) {                 
    }
    $connection -> close();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $postData = json_decode(file_get_contents('php://input',true));
    if(!empty($postData->nome)  && !empty($postData->$cep) && !empty($postData->$endereco)){
        Salvar($postData->nome, $postData->$cep, $postData->$endereco);
    }        
}
else {
    $response['body'] = json_encode([
            'error' => 'Invalid input'
        ]);
    echo $response;
}
?>