
const input = "14 40 12 60";

function main() {
    const [a, b, c, d] = input.split(' ').map(Number);
    if (forma_triangulo_com_tres_de_quatro(a, b, c, d)) {
        console.log("S");
    } else {
        console.log("N");
    }
}

function forma_triangulo_com_tres_de_quatro(a, b, c, d) {
    if (forma_triangulo(a, b, c)) return true;
    if (forma_triangulo(a, b, d)) return true;
    if (forma_triangulo(a, c, d)) return true;
    if (forma_triangulo(b, c, d)) return true;
    return false;
}

function forma_triangulo(a, b, c) {
    if (a >= b + c) return false;
    if (b >= a + c) return false;
    if (c >= a + b) return false;
    return true;
}

main();
