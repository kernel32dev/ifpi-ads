import { question } from "readline-sync"

console.log("4. Leia o valor do dólar e um valor em dólar, calcule e escreva o equivalente em real (R$).")


const valor_do_dolar = Number(question("Valor do dólar em reais: "));
const dolares = Number(question("Valor em dólares: "));

const reais = dolares * valor_do_dolar;

console.log(`$${dolares.toFixed(2)} em reais (a R$${valor_do_dolar} o dólar) é R$${dolares}`);
