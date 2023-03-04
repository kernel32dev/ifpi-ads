import { question } from "readline-sync"

console.log("7. Leia 3 números, calcule e escreva a soma dos 2 primeiros e a diferença entre os 2 últimos.");

const a = Number(question("Número A: "));
const b = Number(question("Número B: "));
const c = Number(question("Número C: "));

console.log(`A + B = ${a + b}`);
console.log(`B - C = ${b - c}}`);
