import { question } from "readline-sync"

console.log("15. Leia o valor da base e altura de um triângulo, calcule e escreva sua área. (área=(base * altura)/2)");

const base = Number(question("Base do triângulo: "));
const altura = Number(question("Altura do triângulo: "))

console.log(`Área: ${base * altura * 0.5}`);
