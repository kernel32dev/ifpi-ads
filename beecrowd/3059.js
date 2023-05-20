
const lines = ["7 19 52","45 12 11 7 83 29 5",];
//const lines = ["2 -2 2","12 -16"];

function main() {
    const [length, minimo, maximo] = lines[0].split(' ').map(Number);
    const numeros = lines[1].split(' ').map(Number);
    const numero_pares = calcula_numero_de_pares(numeros, length, minimo, maximo);
    console.log(numero_pares);
}

function calcula_numero_de_pares(numeros, length, minimo, maximo) {
    let start = 0;
    let pares_encontrados = 0;
    orderna_array(numeros);
    for (let j = 1; j < length; j++) {
        while (numeros[start] + numeros[j] > maximo && start < j - 1) {
            start++;
        }
        for (let i = start; i < j; i++) {
            const valor_par = numeros[i] + numeros[j];
            if (valor_par >= minimo && valor_par <= maximo) {
                pares_encontrados++;
            }
            if (valor_par > maximo) {
                break;
            }
        }
    }
    return pares_encontrados;
}

function orderna_array(numeros) {
    function compara(x, y) {
        return x - y;
    }
    numeros.sort(compara);
}

main();
