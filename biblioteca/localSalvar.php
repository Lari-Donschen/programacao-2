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
    $putData = json_decode(file_get_contents('php://input',true));
            $nome = htmlspecialchars($_POST['nome']); 
            $cep = htmlspecialchars($_POST['cep']); 
            $endereco = htmlspecialchars($_POST['endereco']);

            if(!empty($nome && $cep && $endereco)){
                Salvar($nome, $cep, $endereco);
            }        
        }
else {
    $response['body'] = json_encode([
            'error' => 'Invalid input'
        ]);
    echo $response;
}
?>