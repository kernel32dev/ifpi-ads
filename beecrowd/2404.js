
const input = "5 6\n1 2 15\n1 3 10\n2 3 1\n3 4 3\n2 4 5\n4 5 20\n";
//const input = "4 6\n1 2 1\n1 3 10\n1 4 1\n2 3 1\n2 4 10\n3 4 1";
const lines = input.split("\n");

const EXPLORADO = 2;
const VISITADO = 1;
const NAO_VISITADO = 0;

function main() {
    const [numero_cidades, numero_ruas] = lines[0].split(' ').map(Number);
    const grafo = constroi_grafo(numero_cidades, numero_ruas, lines);
    const menor_comprimento_total = calcula_menor_comprimento_total_sem_ciclos(grafo);
    console.log(menor_comprimento_total);
}

function constroi_grafo(numero_cidades, numero_ruas, lines) {
    const cidades = [];
    const ruas = [];
    for (let i = 1; i <= numero_cidades; i++) {
        cidades.push({
            ruas: [],
            visitado: NAO_VISITADO,
        });
    }
    for (let i = 1; i <= numero_ruas; i++) {
        let [u, v, comprimento] = lines[i].split(' ').map(Number);
        const rua = {
            u: cidades[u - 1],
            v: cidades[v - 1],
            elminada: false,
            comprimento: comprimento,
        };
        rua.u.ruas.push(rua);
        rua.v.ruas.push(rua);
        ruas.push(rua)
    }
    ordena_ruas_comprimento_decrescente(ruas);
    return {cidades: cidades, ruas: ruas};
}

function ordena_ruas_comprimento_decrescente(ruas) {
    function compare(a, b) {
        return b.comprimento - a.comprimento;
    }
    ruas.sort(compare);
}

function calcula_menor_comprimento_total_sem_ciclos(grafo) {
    let comprimento = 0;
    for (let rua of grafo.ruas) {
        if (esta_dentro_de_um_ciclo(grafo, rua)) {
            rua.elminada = true;
        } else {
            comprimento += rua.comprimento;
        }
    }
    return comprimento;
}

function esta_dentro_de_um_ciclo(grafo, rua) {
    // faz as cidades esqucerem desta rua (temporariamente)
    rua.elminada = true;
    // marca elas como visitadas
    rua.u.visitado = VISITADO;
    rua.v.visitado = -VISITADO;
    // expande os visitados, até não poder mais, ou até um visitado positivo encontrar um negativo
    let esta_em_um_ciclo = explora(grafo);
    // reseta todos os "visitado"
    for (let cidade of grafo.cidades) {
        cidade.visitado = NAO_VISITADO;
    }
    // faz as cidades lembrarem desta rua
    rua.elminada = false;
    return esta_em_um_ciclo;
}

function explora(grafo) {
    let mais_a_explorar_positivo;
    let mais_a_explorar_negativo;
    do {
        mais_a_explorar_positivo = false;
        mais_a_explorar_negativo = false;
        for (let cidade of grafo.cidades) {
            if (Math.abs(cidade.visitado) === VISITADO) {
                for (let rua of cidade.ruas) {
                    if (!rua.elminada) {
                        let outra_cidade;
                        if (rua.u === cidade) {
                            outra_cidade = rua.v;
                        } else if (rua.v === cidade) {
                            outra_cidade = rua.u;
                        }
                        if (Math.abs(outra_cidade.visitado) === NAO_VISITADO) {
                            outra_cidade.visitado = cidade.visitado;
                            if (Math.sign(cidade.visitado) === 1) {
                                mais_a_explorar_positivo = true;
                            } else {
                                mais_a_explorar_negativo = true;
                            }
                        } else if (Math.sign(outra_cidade.visitado) === -Math.sign(cidade.visitado)) {
                            return true;
                        }
                    }
                }
                cidade.visitado = Math.sign(cidade.visitado) * EXPLORADO;
            }
        }
    } while (mais_a_explorar_positivo && mais_a_explorar_negativo);
    return false;
}

main();
