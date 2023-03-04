import { question } from "readline-sync"

console.log("9. Leia 2 números (A, B) e escreva-os em ordem inversa (B, A).");

const a = Number(question("Número A: "));
const b = Number(question("Número B: "));

console.log(`B = ${b}`);
console.log(`A = ${a}`);
