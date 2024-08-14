document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("enviarBtn").addEventListener("click", function() {
        let redes = Array.from(document.getElementsByName("redesSociais")).filter(x => x.checked).map(x => x.value).join(", ");
        if (redes != "") {
            document.getElementById("redesSelecionadas").innerText = redes;
        } else {
            document.getElementById("redesSelecionadas").innerText = "";
            exibeErro("selecione pelo menos uma rede", "mensagemErro")
        }
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