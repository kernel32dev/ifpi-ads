import {log, question_float} from './utils.js';

const M_POR_CM = 0.01;
const LITROS_POR_METRO_CUBICO = 1000;
const PERC_CAPACIDADE_SEGURA = 0.85;

function main() {
    log("Dica: aperte enter com o campo vazio para usar o valor padrão");
    const largura_m = question_float("Largura da piscina (cm)", 20_00) * M_POR_CM;
    const comprimento_m = question_float("Comprimento da piscina (cm)", 30_00) * M_POR_CM;
    const profundidade_m = question_float("Profundidade da piscina (cm)", 2_00) * M_POR_CM;

    const litros_capacidade_maxima = largura_m * comprimento_m * profundidade_m * LITROS_POR_METRO_CUBICO;
    const litros_capacidade_segura = litros_capacidade_maxima * PERC_CAPACIDADE_SEGURA;

    log(`É recomendado encher a piscina até no máximo ${litros_capacidade_segura} litros`);

    const preco_litro = question_float("Preço de 1000 litros", 4) / 1000;
    const preco_capacidade_segura = arrendonda_para_cima_em_casas(litros_capacidade_segura, 1000) * preco_litro;

    log(`Para encher a piscina até a capacidade recomendada você vai gastar R$ ${preco_capacidade_segura}`);

    const preco_reposicao_mensal = preco_capacidade_segura * 0.10;

    log(`E para repor 10% da capacidade recomendada todo mês você vai gastar R$ ${preco_reposicao_mensal} mensalmente`);
}

// arrendonda valor para o menor multiplo de casa que seja maior que ou igual a valor
// exemplos:
// arrendonda_para_cima_em_casas(200, 500) = 500
// arrendonda_para_cima_em_casas(500, 500) = 500
// arrendonda_para_cima_em_casas(700, 500) = 1000
// arrendonda_para_cima_em_casas(1333, 1000) = 2000
function arrendonda_para_cima_em_casas(valor, casa) {
    return Math.ceil(valor / casa) * casa;
}

main();
