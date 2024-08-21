document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("newButton").addEventListener("click", function() {
        let hashtag = document.getElementById("newInput").value;
        let select = document.getElementById("select");
        if (select.children.length >= 5) {
            exibeErro("não tem como adicionar mais hashtags", "mensagemErro");
            return;
        }
        if (hashtag.length <= 2) {
            exibeErro("hashtags tem que ter no mínimo 3 caracteres", "mensagemErro");
            return;
        }
        if (!Array.from(select.children).every(x => x.value != hashtag)) {
            exibeErro("esse hashtag já existe", "mensagemErro");
            return;
        }
        let opt = document.createElement("option");
        opt.value = hashtag;
        opt.innerText = hashtag;
        select.appendChild(opt);
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