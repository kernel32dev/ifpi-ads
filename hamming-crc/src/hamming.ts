import { flip, isEven, isPowerOfTwo } from "./utils";

const PARIDADES = {
    PAR: false,
    IMPAR: true,
};

const paridade = PARIDADES.PAR;

export function encode(message: string): string {
    let code = message.split("");
    let output = [];
    let toda_redundancia = "";
    for (let i = 1; code.length > 0; i++) {
        if (isPowerOfTwo(i)) {
            output.push("?");
        } else {
            output.push(code.shift());
        }
    }
    for (let i = 0; i < output.length; i++) {
        if (output[i] != "?") continue;
        const posicao_i = i + 1;
        let quantidade = 0;
        for (let j = i + 1; j < output.length; j++) {
            const posicao_j = j + 1;
            if (output[j] == "1" && (posicao_i & posicao_j)) {
                quantidade++;
            }
        }
        const redundancia = (paridade == isEven(quantidade)) ? "1" : "0";
        toda_redundancia += redundancia;
        output[i] = redundancia;
    }
    console.log("redundancia: " + toda_redundancia);
    return output.join("");
}

export function decode(encoded: string): string {
    let erro = 0;
    for (let i = 0; i < encoded.length; i++) {
        if (!isPowerOfTwo(i + 1)) continue;
        const posicao_i = i + 1;
        let quantidade = 0;
        for (let j = i + 1; j < encoded.length; j++) {
            const posicao_j = j + 1;
            if (encoded[j] == "1" && (posicao_i & posicao_j)) {
                quantidade++;
            }
        }
        const redundancia = (paridade == isEven(quantidade)) ? "1" : "0";
        if (redundancia != encoded[i]) {
            erro |= posicao_i;
        }
    }
    if (erro != 0) {
        encoded = flip(encoded, erro - 1);
    }
    let decoded = "";
    for (let i = 0; i < encoded.length; i++) {
        if (!isPowerOfTwo(i + 1)) {
            decoded += encoded[i];
        }
    }
    return decoded;
}
