document.addEventListener('DOMContentLoaded', function () {
    var botaoExibir = document.getElementById('botaoExibir');
    botaoExibir.addEventListener('click', exibirConteudo);
});
function exibirConteudo() {
    var conteudo = document.getElementById('caixaDeTexto').value;
    conteudo = conteudo.trim();
    if (conteudo == "") {
        exibeErro('o campo não pode estar vazio', 'mensagemErro');
        document.getElementById('conteudo').innerHTML = "";
        return;
    }
    document.getElementById('conteudo').innerHTML = conteudo;
}
function exibeErro(mensagem, id) {
    var errorMessage = document.getElementById(id);
    errorMessage.innerText = mensagem;
    errorMessage.classList.remove('oculto');
    setTimeout(function () {
        errorMessage.classList.add('oculto');
    }, 3000);
}