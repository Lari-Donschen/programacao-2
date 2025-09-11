<?php
header('Content-Type: application/json');

function Salvar($localId, $livroId, $dataEntrada){
    $connection = require("dbfactory.php");                        
    if ($connection -> 
        query("INSERT INTO item (localId, livroId, dataEntrada) VALUES ('$localId', '$livroId', '$dataEntrada')")) {                 
    }
    $connection -> close();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $postData = json_decode(file_get_contents('php://input', true));
    if(!empty($postData->localId) && !empty($postData->livroId) && !empty($postData->dataEntrada)){
        Salvar($postData->localId, $postData->livroId, $postData->dataEntrada);
    }        
}
else {
    $response['body'] = json_encode([
            'error' => 'Invalid input'
        ]);
    echo $response;
}
?>