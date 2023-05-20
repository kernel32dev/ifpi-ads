
const input = "3 3\n3 5 6\n1 2 3\n1 1 1";
const lines = input.split('\n');

function main() {
    const [numero_competidores, numero_corridas] = lines[0].split(' ').map(Number);
    const vencedor = determina_vencedor(numero_competidores, numero_corridas, lines);
    console.log(vencedor);
}

function determina_vencedor(numero_competidores, numero_corridas, corridas) {
    let melhor_index = 1;
    let melhor_tempo = soma_lista(corridas[1]);
    for (let i = 2; i <= numero_competidores; i++) {
        const tempo = soma_lista(corridas[i]);
        if (tempo < melhor_tempo) {
            melhor_index = i;
            melhor_tempo = tempo;
        }
    }
    return melhor_index;
}

function soma_lista(lista) {
    let total = 0;
    for (let item of lista.split(' ').map(Number)) {
        total += item;
    }
    return total;
}

main();
