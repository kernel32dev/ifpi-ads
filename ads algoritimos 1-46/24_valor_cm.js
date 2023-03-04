import { question } from "readline-sync"

console.log("24. Leia um valor em m, calcule e escreva o equivalente em cm.");

const metros = Number(question("metros: "));

console.log(`cm: ${(metros * 0.01).toFixed(2)}`);
