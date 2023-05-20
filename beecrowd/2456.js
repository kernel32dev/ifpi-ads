
const input = "12";

function main() {
    const cartas = input.split(' ').map(Number);
    if (crescente(cartas)) {
        console.log("C");
    } else if (crescente(cartas.reverse())) {
        console.log("D");
    } else {
        console.log("N");
    }
}

function crescente(cartas) {
    for (let i = 1; i < cartas.length; i++) {
        if (cartas[i - 1] > cartas[i]) {
            return false;
        }
    }
    return true;
}

main();
