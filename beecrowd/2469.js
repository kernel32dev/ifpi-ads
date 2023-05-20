
const lines = [
    "10",
    "20 25 85 40 25 90 25 40 55 40",
];

function main() {
    const notas = lines[1].split(' ').map(Number);
    console.log(encontra_nota_mais_comum_e_maior(notas));
}

function encontra_nota_mais_comum_e_maior(notas) {
    let resumo = {};
    let maior_quantidade = 0;
    let maior_nota = 0;
    for (let nota of notas) {
        const quantidade = (resumo[nota] || 0) + 1;
        resumo[nota] = quantidade;
        const novo_maior = quantidade > maior_quantidade || (quantidade == maior_quantidade && nota > maior_nota);
        if (novo_maior) {
            maior_quantidade = quantidade;
            maior_nota = nota;
        }
    }
    return maior_nota;
}

main();
