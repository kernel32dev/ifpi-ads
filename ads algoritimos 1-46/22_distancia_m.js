import { question } from "readline-sync"

console.log("22. Leia um valor em km, calcule e escreva o equivalente em m.");

const km = Number(question("km: "));

console.log(`metros: ${km * 1000}`);
