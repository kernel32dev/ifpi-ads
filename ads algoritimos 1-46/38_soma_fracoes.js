import { question } from "readline-sync"

console.log("38. Leia 2 (duas) frações (numerador e denominador), calcule e escreva a soma destas frações, escrevendo o resultado em forma de fração.");

const num1 = Number(question("Numerador 1: "));
const den1 = Number(question("Denominador 1: "));
const num2 = Number(question("Numerador 2: "));
const den2 = Number(question("Denominador 2: "));

const num_total = num1 * den2 + num2 * den1; // 👀
const den_total = den1 * den2;

console.log(`${num1}/${den1} + ${num2}/${den2} = ${num_total}/${den_total}`);
