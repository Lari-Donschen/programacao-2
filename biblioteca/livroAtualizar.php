<?php
header('Content-Type: application/json');
//quando for uma requisição com verbo do tipo "PUT"
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {   
    $connection = require("dbfactory.php");
    //captura os dados de entrada da requisição e transforma em objeto no PHP
    $putData = json_decode(file_get_contents('php://input', true));
    $id = $putData->id;
    $descricaoNovo = $putData->descricao;
    $tituloNovo = $putData->titulo;
    $autorNovo = $putData->autor;
    $sql = "update livro set titulo = '$tituloNovo', autor = '$autorNovo', descricao = '$descricaoNovo' where id = $id";    
    
    if ($connection -> query($sql)) {                 
    }
    $connection -> close();
    //depois de executar a operação, retorna o json enviado    
    $response['body'] = json_encode($putData);
    echo $response['body'];        
} else {
    $response['body'] = json_encode([
            'error' => 'Invalid input'
        ]);
    echo $response;
}
?>