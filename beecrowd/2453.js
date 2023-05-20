
const input = "pUpm pfpiplpmpe plpepgpapl";

function main() {
    const traduzido = traduzir(input.trim());
    console.log(traduzido);
}

function traduzir(texto) {
    let traduzido = "";
    let consome_o_p = true;
    for (let char of texto) {
        if (consome_o_p && char === "p") {
            consome_o_p = false;
        } else {
            consome_o_p = true;
            traduzido += char;
        }
    }
    return traduzido;
}

main();
