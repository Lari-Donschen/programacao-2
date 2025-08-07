async function removerTodo (elemento){    
    var elementoRemover = document.querySelector("#"+elemento);
    elementoRemover.remove();    
    await removerBanco(elemento.substring(1,elemento.length));    
    console.log(elemento);
}

async function removerBanco(idElemento){
    await fetch('http://localhost:8080/delete.php?id='+idElemento, {
        method: 'DELETE'})
    .then((response) => {
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response.text);
    })
    .then((data) => {
        console.log('Data fetched:', data);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });    
}

async function atualizarTodo (elemento, descricao){    
    var elementoAtualizar = document.querySelector("#"+elemento);
    var descricao = elementoAtualizar.querySelector(".valor-descricao"); 
    console.log(elemento);
}

async function atualizarBanco(idElemento, descricao){
    await fetch('http://localhost:8080/delete.php?id='+idElemento, {
        method: 'PUT'})
    .then((response) => {
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response.text);
    })
    .then((data) => {
        console.log('Data fetched:', data);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });    
}