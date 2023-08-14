const input = "6\nplant\nant\ncant\ndecant\ndeca\nan\n2\nsupercalifragilisticexpialidocious\nrag\n0\n";
const lines = input.split('\n');

let index = 0;

while (true) {
    let count = Number(lines[index++]);
    if (count === 0) {
        break;
    }
    let baldes = construir_baldes(count);
    let maior = calcular_obter_maior_seq(baldes);
    //console.log(maior, baldes);
    console.log(maior);
}

/// lê count strings, e organiza ela em um multi-map baseado nos tamanhos das strings
function construir_baldes(count) {
    let largest = 0;
    let obj = {};
    for (let i = 0; i < count; i++) {
        let line = lines[index++];
        if (largest < line.length) {
            largest = line.length;
        }
        if (obj[line.length] === undefined) {
            obj[line.length] = [preparar_string(line)];
        } else {
            obj[line.length].push(preparar_string(line));
        }
    }
    let arr = [];
    for (let i = largest; i >= 0; i--) {
        let item = obj[i];
        if (item) {
            arr.push(item);
        }
    }
    return arr;
}

function preparar_string(string) {
    let lower = 0, upper = 0;
    for (let i = 0; i < string.length; i++) {
        let code = string.charCodeAt(i);
        if (code >= 65 && code <= 90) {
            upper |= (1 << (code - 65))
        }
        if (code >= 97 && code <= 122) {
            lower |= (1 << (code - 97))
        }
    }
    return {
        text: string,
        upper: upper,
        lower: lower,
        seq: 0,
    };
}

function calcular_obter_maior_seq(baldes) {
    let maior_seq = 0;
    for (let i = 0; i < baldes[0].length; i++) {
        baldes[0][i].seq = 1;
    }
    /// para o maior balde até o menor
    for (let i = 1; i < baldes.length; i++) {
        const balde_menor = baldes[i];
        /// veja cada item nesse balde
        for (let j = 0; j < balde_menor.length; j++) {
            /// e compare com todos os itens de todos os baldes com itens maiores
            loop_maior: for (let k = i - 1; k >= 0; k--) {
                const balde_maior = baldes[k];
                for (let l = 0; l < balde_maior.length; l++) {
                    if (obj_esta_contido_em_obj(balde_maior[l], balde_menor[j])) {
                        balde_menor[j].seq = balde_maior[l].seq + 1;
                        break loop_maior;
                    }
                }
            }
            if (balde_menor[j].seq === 0) {
                balde_menor[j].seq = 1;
            }
            if (maior_seq < balde_menor[j].seq) {
                maior_seq = balde_menor[j].seq;
            }
        }
    }
    return maior_seq;
}

function obj_esta_contido_em_obj(maior, menor) {
    if (maior.lower & menor.lower !== menor.lower) {
        return false;
    }
    if (maior.upper & menor.upper !== menor.upper) {
        return false;
    }
    return maior.text.indexOf(menor.text) !== -1;
}
