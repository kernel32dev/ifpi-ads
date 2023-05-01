import {log, question_float} from './utils.js';

const TAXA_BANDEIRA = 0.08;
const TAXA_ICMS = 0.25;
const TAXA_PIS_COFINS = 0.15;

function main() {
    log("Dica: aperte enter com o campo vazio para usar o valor padrão");
    const consumo = obter_consumo();
    log("----------------");
    const tarifa = calcula_tarifa(consumo) + 0.08;
    const valor_tarifado = tarifa * consumo;
    const valor_iluminacao = calcula_taxa_ilumninacao(consumo) * valor_tarifado;
    const valor_bandeira = consumo * TAXA_BANDEIRA;
    const valor_icms = valor_tarifado * TAXA_ICMS;
    const valor_pis_confins = valor_tarifado * TAXA_PIS_COFINS;
    log(`Consumo: ${consumo} KWh`);
    log(`Valor faturado R$ ${valor_tarifado}`);
    log(`Bandeira: R$ ${valor_bandeira}`);
    log(`ICMS: R$ ${valor_icms}`);
    log(`PIS/COFINS: R$ ${valor_pis_confins}`);
    log(`Taxa iluminação: R$ ${valor_iluminacao}`);
}

function obter_consumo() {
    while (true) {
        const leitura_atual = question_float("Leitura atual", 100, 0, undefined);
        const leitura_anterior = question_float("Leitura anterior", 0, 0, undefined);
        if (leitura_atual >= leitura_anterior) {
            return leitura_atual - leitura_anterior;
        } else {
            log("Informe uma leitura atual maior que a anterior");
        }
    }
}

// retorna reais / KWh
function calcula_tarifa(consumo) {
    if (consumo <= 30) return 0;
    if (consumo <= 100) return 0.59;
    return 0.75;
}

function calcula_taxa_ilumninacao(consumo) {
    if (consumo <= 80) return 0;
    return 0.06;
}

main();
