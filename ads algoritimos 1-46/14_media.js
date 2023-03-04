import { readline } from "readline"
import { question } from "readline-sync";

console.log("14. Leia 3 notas de um aluno e o peso de cada nota, calcule e escreva a média ponderada.");

const nota1 = Number(question("Nota #1: "));
const peso1 = Number(question("Nota #1: "));

const nota2 = Number(question("Nota #2: "));
const peso2 = Number(question("Nota #2: "));

const nota3 = Number(question("Nota #3: "));
const peso3 = Number(question("Nota #3: "));

const media_ponderada = (nota1 * peso1 + nota2 * peso2 + nota3 * peso3) / (peso1 + peso2 + peso3);

console.log(`Média ponderada: ${media_ponderada.toFixed(2)}`)
