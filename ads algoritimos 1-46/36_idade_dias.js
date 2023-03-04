import { question } from "readline-sync"

console.log("36. Leia a idade de uma pessoa expressa em anos, meses e dias e escreva-a expressa apenas em dias.");

const anos = Number(question("Anos: "));
const meses = Number(question("Meses: "));
const dias = Number(question("Dias: "));

console.log(`Total de dias: ${anos * 365 + meses * 30 + dias}`);
