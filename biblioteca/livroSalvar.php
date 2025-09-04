<?php
header('Content-Type: application/json');

function Salvar($descricao, $titulo, $autor){
            $connection = require("dbfactory.php");                        
            if ($connection -> 
                query(@"INSERT INTO pessoa (descricao, titulo, autor) VALUES ('$nome', '$cpf', '$endereco');")) {                 
            }
            $connection -> close();
        }

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $putData = json_decode(file_get_contents('php://input',true));
            $nome = htmlspecialchars($_POST['nome']); 
            $cpf = htmlspecialchars($_POST['cpf']); 
            $endereco = htmlspecialchars($_POST['endereco']);

            if(!empty($nome && $cpf && $endereco)){
                Salvar($nome, $cpf, $endereco);
            }        
        }
else {
    $response['body'] = json_encode([
            'error' => 'Invalid input'
        ]);
    echo $response;
}
?>