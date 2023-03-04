import { question } from "readline-sync"

console.log("13. Leia um valor em real (R$), calcule e escreva 70% deste valor.");

const valor = Number(question("Valor: "));

console.log(`75% de R$${valor.toFixed(2)} é R$${(valor * 0.75).toFixed(2)}`);
