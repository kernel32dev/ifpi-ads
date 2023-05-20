
//const input = "7\n0\n5\n12\n41\n7\n5\n41";
const input = "3\n2\n3\n1";
const lines = input.split('\n');

function main() {
    const length = Number(lines[0]);
    console.log(conta_unicos(lines, length));
}

function conta_unicos(lista, length) {
    let count = 0;
    let obj = {};
    for (let i = 1; i <= length; i++) {
        if (!(lista[i] in obj)) {
            obj[lista[i]] = undefined;
            count++;
        }
    }
    return count;
}

/*function presente(lista, ate, valor) {
    for (let i = 1; i < ate; i++) {
        if (lista[i] === valor) {
            return true;
        }
    }
    return false;
}*/

main();
