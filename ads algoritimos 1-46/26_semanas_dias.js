import { question } from "readline-sync"

console.log("26. Leia um número inteiro de dias, calcule e escreva quantas semanas e quantos dias ele corresponde.");

const dias = Number(question("Dias: "));

console.log(`Semanas: ${Math.floor(dias / 7)}`);
console.log(`Dias: ${dias % 7}`);
