import {log, question_string, question_float, question_integer} from './utils.js';

const SELIC = 13.75;

function main() {
    log("Dica: aperte enter com o campo vazio para usar o valor padrão");
    const renda_mensal = question_float("Renda mensal", 3_000, 0, undefined);
    const valor_emprestimo = question_float("Valor do emprestimo", 9_000, 0, undefined);
    const prazo = question_integer("Prazo desejado", 12, 2, 24);

    const taxa = calcula_taxa(prazo);

    const valor_iof = valor_emprestimo * calcula_taxa_iof(prazo);

    const total_juros = calcula_total_juros(prazo, taxa, valor_iof + valor_emprestimo / prazo) - valor_iof;
    
    const valor_total = taxa + total_juros + valor_iof;
    const parcela_mensal = valor_total / 12;
    const comprometimento_renda_mensal = 100 * parcela_mensal / renda_mensal;

    log("-------------------");
    log(`Valor Pedido: R$ ${valor_emprestimo}`);
    log(`Valor do IOF: R$ ${valor_iof.toFixed(2)}`);
    log(`Valor dos Juros a pagar: R$ ${total_juros.toFixed(2)}`);
    log(`Valor Total a pagar: R$ ${valor_total.toFixed(2)}`);
    log(`Valor da Parcela Mensal: ${prazo}x de R$ ${parcela_mensal.toFixed(2)}`);
    log(`Comprometimento da Renda Mensal: ${comprometimento_renda_mensal.toFixed(0)}%`);
}

function calcula_taxa_iof(prazo) {
    return 0.0038 + 0.000082 * prazo * 30;
}

function calcula_taxa(prazo) {
    if (prazo <= 6) return SELIC * 0.50;
    if (prazo <= 12) return SELIC * 0.75;
    if (prazo <= 18) return SELIC * 1.00;
    return SELIC * 1.30;
}

function calcula_total_juros(prazo, taxa, valor_mensal) {
    let total_juros = 0;
    let mes = 1;
    let valor_ajustado = valor_mensal;
    while (mes <= prazo) {
        // aplica o juros para 1 mês
        valor_ajustado += valor_ajustado * taxa / 100;
        // calcula o quanto aquele mês aumentou e adiciona para o total do juros
        total_juros += valor_ajustado - valor_mensal;
        mes += 1;
    }
    return total_juros;
}

main();
