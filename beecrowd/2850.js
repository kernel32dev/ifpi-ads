
const input = "esquerda\ndireita\nnenhuma\nas duas";
const lines = input.split('\n');

function main() {
    for (let line of lines) {
        if (line.length > 0) {
            console.log(papagaio(line));
        }
    }
}

function papagaio(estado) {
    if (estado === "esquerda") return "ingles";
    if (estado === "direita") return "frances";
    if (estado === "nenhuma") return "portugues";
    if (estado === "as duas") return "caiu";
}

main();
