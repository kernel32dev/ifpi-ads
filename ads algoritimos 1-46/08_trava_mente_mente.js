import { question } from "readline-sync"

console.log("8. Leia 2 números, calcule e escreva a divisão da soma pela subtração dos números lidos.");

const a = Number(question("Número A: "));
const b = Number(question("Número B: "));

console.log(`(A + B) / (A - B) = ${(a + b) / (a - b)}`);

