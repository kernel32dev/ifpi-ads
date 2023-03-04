import { question } from "readline-sync"

console.log("45. Um algoritmo para gerenciar os saques de um caixa eletrônico deve possuir algum mecanismo para");
console.log("decidir o numero de notas de cada valor que deve ser disponibilizado para o cliente que realizou o");
console.log("saque. Um possível critério seria o da \"distribuição ótima\" no sentido de que as notas de menor valor");
console.log("disponíveis fossem distribuídas em número mínimo possível. Por exemplo, se a maquina só dispõe de");
console.log("notas de R$ 50, de R$ 10, de R$ 5 e de R$ 1, para uma quantia solicitada de R$ 87, o algoritmo deveria");
console.log("indicar uma nota de R$ 50, três notas de R$ 10, uma nota de R$ 5 e duas notas de R$ 1. Escreva um");
console.log("algoritmo que receba o valor da quantia solicitada e retorne a distribuição das notas de acordo com o");
console.log("critério da distribuição ótima.");

// eita espera aí, era para fazer especifico para os 4 valores de nota da questão né?, que aí não ía precisar de loops ou ifs,
// mas eu só notei que era possível depois e não tô afin de refazer essa

const notas_valores = [50, 10, 5, 1];

let valor;

// pedir valor do usuário, caso ele coloque um valor inválido, pede novamente
// o valor que foi informado será guardado em valor
while (true) {
    valor = Number(question("Valor do saque: "));
    if (Number.isNaN(valor)) {
        console.log("Valor não é um número válido");
        console.log("Informe um valor no formato XXXX");
    } else if (valor < 0) {
        console.log("Não é possível sacar um valor negativo");
    } else if (!Number.isFinite(valor)) {
        console.log("Não é possível sacar um valor infinito, quem tu acha que é? Jeff Bezos?");
    } else if (!Number.isInteger(valor)) {
        console.log("Não é possível sacar um valor decimal, ninguem colocou moedas nessa máquina :(");
    } else {
        break;
    }
}

if (valor === 0) {
    console.log("Nada foi sacado.");
} else {

    // o índice da nota atual da qual estamos puxando
    let notas_index = 0;

    // cria um array com a quantidade de notas de cada valor
    let notas_puxadas = Array(notas_valores.length).fill(0);

    while (valor > 0) {
        if (valor >= notas_valores[notas_index]) {
            // puxa uma nota do valor de nota atual
            notas_puxadas[notas_index] += 1;
            // subtrai esse valor do valor restante
            valor -= notas_valores[notas_index];
        } else {
            // a nota da qual estamos puxando é muito alta, vai para a próxima nota
            notas_index++;
            if (notas_index === notas_valores.length) {
                // não há mais notas da qual puxar
                // (nunca deve acontecer, já que valor sempre começa inteiro e o ultimpo valor de notas_valores é 1)
                console.warn(`Aviso: Não foi possível sacar o restante ${valor}`);
                break;
            }
        }
    }

    console.log("Foram sacadas: ")

    for (let i = 0; i < notas_valores.length; i++) {
        // printa todas as notas usadas
        if (notas_puxadas[i] > 0) {
            if (notas_puxadas[i] === 1) {
                console.log(`${notas_puxadas[i]} nota de R$${notas_valores[i]}`);
            } else {
                console.log(`${notas_puxadas[i]} notas de R$${notas_valores[i]}`);
            }
        }
    }
}