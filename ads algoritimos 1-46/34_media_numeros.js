import { question } from "readline-sync"

console.log("34. Leia 3 números, calcule e escreva a média dos números.");

const a = Number(question("Número A: "));
const b = Number(question("Número A: "));
const c = Number(question("Número A: "));

console.log(`Média: ${(a + b + c) / 3}`);
