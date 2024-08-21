document.addEventListener("DOMContentLoaded", function() {
    const ativosDisponiveis = document.getElementById("ativosDisponiveis");
    const carteiraInvestimentos = document.getElementById("carteiraInvestimentos");
    const moverParaDireitaBtn = document.getElementById("moverParaDireitaBtn");
    const moverParaEsquerdaBtn = document.getElementById("moverParaEsquerdaBtn");
    ativosDisponiveis.addEventListener("change", function() {
        moverParaDireitaBtn.disabled = Array.from(ativosDisponiveis.children).every(x => !x.selected);
    });
    carteiraInvestimentos.addEventListener("change", function() {
        moverParaEsquerdaBtn.disabled = Array.from(carteiraInvestimentos.children).every(x => !x.selected);
    });
    moverParaDireitaBtn.addEventListener("click", function() {
        for (const i of ativosDisponiveis.children) {
            if (i.selected) {
                i.selected = false;
                carteiraInvestimentos.appendChild(i);
            }
        }
        moverParaDireitaBtn.disabled = true;
    });
    moverParaEsquerdaBtn.addEventListener("click", function() {
        for (const i of carteiraInvestimentos.children) {
            if (i.selected) {
                i.selected = false;
                ativosDisponiveis.appendChild(i);
            }
        }
        moverParaEsquerdaBtn.disabled = true;
    });
});