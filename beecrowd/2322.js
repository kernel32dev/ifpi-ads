
const input = "5\n1 2 3 5";
const lines = input.split("\n");

function main() {
    const [first, second] = lines;
    const length = Number(first);
    const lista = second.split(' ').map(Number);
    const faltando = encontra_faltando(lista, length);
    console.log(faltando);
}

function encontra_faltando(lista, length) {
    for (let i = 1; i <= length; i++) {
        if (!contido_na_lista(lista, i)) {
            return i;
        }
    }
}

function contido_na_lista(lista, numero) {
    return lista.indexOf(numero) !== -1;
}

main();
