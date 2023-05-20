
const lines = [
"34 55 77 12 23 99",
"5 3 77 55 42 34"
];

function main() {
    const a = lines[0].split(' ').map(Number);
    const b = lines[1].split(' ').map(Number);
    const iguais = conta_iguais(a, b, 6);
    console.log(premio(iguais));
}

function conta_iguais(a, b, length) {
    let count = 0;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (a[i] === b[j]) {
                count++;
            }
        }
    }
    return count;
}

function premio(n) {
    if (n === 6) return "sena";
    if (n === 5) return "quina";
    if (n === 4) return "quadra";
    if (n === 3) return "terno";
    return "azar"
}

main();
