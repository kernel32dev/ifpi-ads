
//const input = "5\n.ooo.\n..ooA\n..Aoo\nAoooo\n..ooo";
const input = "3\n.o.\noAA\nooo";
const lines = input.split('\n');

function main() {
    const caminho = serializa_caminho(lines);
    const pontos = calcula_melhor_pontuacao_possivel(caminho);
    console.log(pontos);
}

function serializa_caminho(lines) {
    let caminho = "";
    let direita_para_esquerda = false;
    for (let i = 1; i < lines.length; i++) {
        let line = lines[i];
        if (direita_para_esquerda) {
            line = inverter_string(line);
        }
        caminho += line;
        direita_para_esquerda = !direita_para_esquerda;
    }
    return caminho;
}

function inverter_string(line) {
    let reverso = "";
    for (let char of line) {
        reverso = char + reverso;
    }
    return reverso;
}

function calcula_melhor_pontuacao_possivel(caminho) {
    function length(texto) {
        return texto.length;
    }
    function maior(a, b) {
        return Math.max(a, b);
    }
    return caminho
        .replace(/\./g, "")
        .split("A")
        .map(length)
        .reduce(maior);
}

main();
