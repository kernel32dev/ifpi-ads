document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('botaoErro').addEventListener('click', function () {
        let mensagem = document.getElementById("inputErro").value;
        exibeErro(mensagem, 'mensagemErro');
    });
});

function exibeErro(mensagem, id) {
    var errorMessage = document.getElementById(id);
    errorMessage.innerText = mensagem;
    errorMessage.classList.remove('oculto');
    setTimeout(function () {
        errorMessage.classList.add('oculto');
    }, 3000);
}