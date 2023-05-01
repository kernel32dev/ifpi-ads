import {log, question_string, question_float, question_integer} from './utils.js';

function main() {
    log("Dica: aperte enter com o campo vazio para usar o valor padrão");
    const nome = question_string("Nome do cliente", "Will Smith");
    const num_compras = question_integer("Número de compras", 5, 1, undefined);
    let numero_da_compra = 1;
    let vendas_total = 0;
    let cashback_total = 0;
    let cashback_maior = null;
    let cashback_menor = null;
    while (numero_da_compra <= num_compras) {
        const venda = question_float("Valor da compra #" + numero_da_compra, 100 + 200 * numero_da_compra, 0, undefined);
        const cashback = calcula_cashback(venda);
        vendas_total += venda;
        cashback_total += cashback;
        if (cashback_maior === null || cashback_maior < cashback) {
            cashback_maior = cashback;
        }
        if (cashback_menor === null || cashback_menor < cashback) {
            cashback_menor = cashback;
        }
        numero_da_compra += 1;
    }
    const cashback_medio = cashback_total / num_compras;
    const cashback_perc = Math.round(100 * cashback_total / vendas_total);
    log(`Soma das vendas:         R$ ${vendas_total}`)
    log(`Distribuido em cashback: R$ ${cashback_total} (${cashback_perc}%)`)
    log(`Maior cashback pago:     R$ ${cashback_maior}`)
    log(`Menor cashback pago:     R$ ${cashback_menor}`)
    log(`Cashback médio pago:     R$ ${cashback_medio}`)
}

function calcula_cashback(venda) {
    let cashback_5, cashback_7, cashback_8, cashback_25;
    [venda, cashback_5] = remove_retorna(venda, 250);
    [venda, cashback_7] = remove_retorna(venda, 250);
    [venda, cashback_8] = remove_retorna(venda, 250);
    [venda, cashback_25] = remove_retorna(venda, Infinity);
    let cashback = 0;
    cashback += cashback_5 * 0.05;
    cashback += cashback_7 * 0.07;
    cashback += cashback_8 * 0.08;
    cashback += cashback_25 * 0.25;
    return cashback;
}

// remove no maximo maximo, e retorna o novo valor e o valor removido
function remove_retorna(venda, maximo) {
    if (venda <= maximo) {
        // foi pedido mais do que temos, retorna tudo como cashback
        return [0, venda];
    } else {
        // mesmo apos remover o maximo, ainda sobra, retorna o que sobrou e o maximo
        return [venda - maximo, maximo];
    }
}

main();
