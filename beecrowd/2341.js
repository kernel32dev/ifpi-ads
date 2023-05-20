
const input = "20 5\n1 2 3 4 1 2 3 4 1 2 3 4 5 1 2 3 4 5 4 4";
const lines = input.split("\n");

function main() {
    const [first, second] = lines;
    const [length, total_rotulos] = first.split(' ').map(Number);
    const rotulos = second.split(' ').map(Number);
    const envelopes = quantidade_envelopes(rotulos, length, total_rotulos);
    console.log(envelopes);
}

function quantidade_envelopes(rotulos, length, total_rotulos) {
    let minimo = length;
    for (let i = 1; i <= total_rotulos; i++) {
        const quantidade_um_rotulo = quantidade_rotulo(rotulos, length, i);
        if (minimo > quantidade_um_rotulo) {
            minimo = quantidade_um_rotulo;
        }
    }
    return minimo;
}

function quantidade_rotulo(rotulos, length, rotulo) {
    let quantidade = 0;
    for (let i = 0; i < length; i++) {
        if (rotulos[i] === rotulo) {
            quantidade += 1;
        }
    }
    return quantidade;
}

main();
