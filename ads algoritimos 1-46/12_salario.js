import { question } from "readline-sync"

console.log("12. Leia o salário de um trabalhador e escreva seu novo salário com um aumento de 25%.");

const salario = Number(question("Salário: "));

const aumento = salario * 0.25;
const salario_final = salario + aumento;

console.log(`Salário era R$${salario.toFixed(2)}`);
console.log(`Salário e ficou R$${salario_final.toFixed(2)}`);
console.log(`Pois aumentou: R$${aumento} (25%)`);
