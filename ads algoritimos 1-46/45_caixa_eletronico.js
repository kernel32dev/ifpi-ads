import { question } from "readline-sync"

console.log("45. Um algoritmo para gerenciar os saques de um caixa eletrônico deve possuir algum mecanismo para");
console.log("decidir o numero de notas de cada valor que deve ser disponibilizado para o cliente que realizou o");
console.log("saque. Um possível critério seria o da \"distribuição ótima\" no sentido de que as notas de menor valor");
console.log("disponíveis fossem distribuídas em número mínimo possível. Por exemplo, se a maquina só dispõe de");
console.log("notas de R$ 50, de R$ 10, de R$ 5 e de R$ 1, para uma quantia solicitada de R$ 87, o algoritmo deveria");
console.log("indicar uma nota de R$ 50, três notas de R$ 10, uma nota de R$ 5 e duas notas de R$ 1. Escreva um");
console.log("algoritmo que receba o valor da quantia solicitada e retorne a distribuição das notas de acordo com o");
console.log("critério da distribuição ótima.");

let valor = Number(question("Valor do saque: "));

const notas_50 = Math.floor(valor / 50);
valor -= notas_50 * 50;

const notas_10 = Math.floor(valor / 10);
valor -= notas_10 * 10;

const notas_5 = Math.floor(valor / 5);
valor -= notas_5 * 5;

const notas_1 = valor;

console.log("Foram sacadas:");

console.log(`${notas_50} nota(s) de R$50`);
console.log(`${notas_10} nota(s) de R$10`);
console.log(`${notas_5} nota(s) de R$5`);
console.log(`${notas_1} nota(s) de R$1`);
