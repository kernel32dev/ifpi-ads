import { question } from "readline-sync"

console.log("29. Leia um número inteiro de meses, calcule e escreva quantos anos e quantos meses ele corresponde.");

const meses_total = Number(question("Meses: "));

const meses = horas_total % 12;
const anos = Math.floor(horas_total / 12);

console.log(`${horas_total} meses pode ser escrito como ${anos} anos(s) e ${meses} meses(s)`);
