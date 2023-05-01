import {log, question_float} from './utils.js';

function main() {
    log("Dica: aperte enter com o campo vazio para usar o valor padrão");
    log("Critérios: ");
    log(" a. Dados positivos (cartão de crédito, consórcio, consignado, empréstimos e financiamentos) comportamentos de pagamento, tempo dos contratos e tipos de contratos");
    log(" b. Informações de dívidas, histórico de regularização e em aberto");
    log(" c. Consultas para novos contratos de serviço ou crédito");
    log("----------------");
    const a = question_float("Critério a", 70, 0, 100);
    const b = question_float("Critério b", 55, 0, 100);
    const c = question_float("Critério c", 100, 0, 100);
    const pontos_v1 = calcula_pontos_v1(a, b, c);
    const pontos_v2 = calcula_pontos_v2(a, b, c);
    const categoria_v1 = calcula_categoria_v1(pontos_v1);
    const categoria_v2 = calcula_categoria_v2(pontos_v2);
    log("----------------");
    log(`Serasa 1.0: ${pontos_v1} pontos - ${categoria_v1}`);
    log(`Serasa 2.0: ${pontos_v2} pontos - ${categoria_v2}`);
}

function calcula_pontos_v1(a, b, c) {
    const maximo_a = 260;
    const maximo_b = 570;
    const maximo_c = 170;
    const pontos_a = a * 0.01 * maximo_a;
    const pontos_b = b * 0.01 * maximo_b;
    const pontos_c = c * 0.01 * maximo_c;
    return Math.round(pontos_a + pontos_b + pontos_c);
}

function calcula_pontos_v2(a, b, c) {
    const maximo_a = 620;
    const maximo_b = 190;
    const maximo_c = 190;
    const pontos_a = a * 0.01 * maximo_a;
    const pontos_b = b * 0.01 * maximo_b;
    const pontos_c = c * 0.01 * maximo_c;
    return Math.round(pontos_a + pontos_b + pontos_c);
}

function calcula_categoria_v1(pontos) {
    if (pontos <= 400) return "Baixo";
    if (pontos <= 600) return "Regular";
    if (pontos <= 800) return "Bom";
    return "Muito bom";
}

function calcula_categoria_v2(pontos) {
    if (pontos <= 300) return "Baixo";
    if (pontos <= 500) return "Regular";
    if (pontos <= 700) return "Bom";
    return "Muito bom";
}

main();
