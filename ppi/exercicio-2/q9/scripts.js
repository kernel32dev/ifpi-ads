document.addEventListener("DOMContentLoaded", function() {
    const ativosDisponiveis = document.getElementById("ativosDisponiveis");
    const carteiraInvestimentos = document.getElementById("carteiraInvestimentos");
    const moverParaDireitaBtn = document.getElementById("moverParaDireitaBtn");
    const moverParaEsquerdaBtn = document.getElementById("moverParaEsquerdaBtn");
    moverParaDireitaBtn.addEventListener("click", function() {
        for (const i of ativosDisponiveis.children) {
            if (i.selected) {
                i.selected = false;
                carteiraInvestimentos.appendChild(i);
            }
        }
    });
    moverParaEsquerdaBtn.addEventListener("click", function() {
        for (const i of carteiraInvestimentos.children) {
            if (i.selected) {
                i.selected = false;
                ativosDisponiveis.appendChild(i);
            }
        }
    });
});