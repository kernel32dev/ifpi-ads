import { question } from "readline-sync"

console.log("25. Leia um número inteiro de metros, calcule e escreva quantos Km e quantos metros ele corresponde.");

const km = Number(question("km: "));

console.log(`km: ${Math.floor(km / 1000)}`);
console.log(`metros: ${km % 1000}`);
