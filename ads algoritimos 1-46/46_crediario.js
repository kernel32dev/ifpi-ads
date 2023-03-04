import { question } from "readline-sync"

console.log("46. Uma loja vende seus produtos no sistema entrada mais duas prestações, sendo a entrada maior ou igual a");
console.log("cada uma das duas prestações; estas devem ser iguais, inteiras e as maiores possíveis. Por exemplo, se o");
console.log("valor da mercadoria for R$ 270,00, a entrada e as duas prestações são iguais a R$ 90,00; se o valor da");
console.log("mercadoria for R$ 302,00, a entrada é de R$ 102,00 e as duas prestações são iguais a R$ 100,00.");
console.log("Escreva um algoritmo que receba o valor da mercadoria e forneça o valor da entrada e das duas");
console.log("prestações, de acordo com as regras acima.");

let valor_da_mercadoria = Number(question("Valor da mercadoria: "));

const resto = valor_da_mercadoria % 3;

// valor_da_mercadoria agora é divível por 3
valor_da_mercadoria -= resto;

const entrada = valor_da_mercadoria / 3 + resto;
const prestacao = valor_da_mercadoria / 3;

console.log(`Entrada: R$${entrada}`);
console.log(`Prestação 1: R$${prestacao}`);
console.log(`Prestação 2: R$${prestacao}`);
