
const lines = [
    "iohmunlcawygdfbqpvxzerjskt",
    "haufhaimihbdqezihib",
];

function main() {
    const [dicionario, mensagem] = lines;
    console.log(decifrar(dicionario, mensagem));
}

function decifrar(dicionario, mensagem) {
    let decifrado = "";
    for (let char of mensagem) {
        const index = char.charCodeAt() - 97;
        decifrado += dicionario[index];
    }
    return decifrado;
}

main();
