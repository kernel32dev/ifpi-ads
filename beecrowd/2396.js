
const input = "5 2\n3 7\n2 5\n1 1\n15 2\n2 2";
const lines = input.split('\n');

function main() {
    const [numero_competidores, numero_corridas] = lines[0].split(' ').map(Number);
    const [primeiro, segundo, terceiro] = determina_vencedor(numero_competidores, numero_corridas, lines);
    console.log(primeiro);
    console.log(segundo);
    console.log(terceiro);
}

function determina_vencedor(numero_competidores, numero_corridas, corridas) {
    const podium = [[0, Infinity], [0, Infinity], [0, Infinity]];
    for (let i = 1; i <= numero_competidores; i++) {
        const tempo = soma_lista(corridas[i]);
        atualiza_podium(podium, i, tempo);
    }
    const [primeiro, segundo, terceiro] = podium;
    return [primeiro[0], segundo[0], terceiro[0]];
}

function atualiza_podium(podium, index, tempo) {
    if (tempo < podium[0][1]) {
        podium[2] = podium[1];
        podium[1] = podium[0]
        podium[0] = [index, tempo];
    } else if (tempo < podium[1][1]) {
        podium[2] = podium[1];
        podium[1] = [index, tempo];
    } else if (tempo < podium[2][1]) {
        podium[2] = [index, tempo];
    }
}

function soma_lista(lista) {
    let total = 0;
    for (let item of lista.split(' ').map(Number)) {
        total += item;
    }
    return total;
}

main();
