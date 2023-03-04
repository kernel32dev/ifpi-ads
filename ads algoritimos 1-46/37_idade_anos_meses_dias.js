import { question } from "readline-sync"

console.log("37. Leia a idade de uma pessoa expressa em dias e escreva-a expressa em anos, meses e dias.");

const dias = Number(question("Dias: "));

console.log(`anos: ${Math.floor(dias / (30 * 12))}`);
console.log(`meses: ${Math.floor(dias / 30) % 12}`);
console.log(`dias: ${dias % 30}`);
