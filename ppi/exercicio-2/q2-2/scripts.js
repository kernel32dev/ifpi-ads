document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("btnRun").addEventListener("click", function() {
        let i = Number(document.getElementById("numInteractions").value);
        let v = Number(document.getElementById("numViews").value);
        let t = 100 * i / v;
        if (!isNaN(t) && isFinite(t)) {
            document.getElementById("output").innerText = t.toFixed(2) + '%';
        } else {
            exibeErro("insira números válidos nos campos", "mensagemErro")
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