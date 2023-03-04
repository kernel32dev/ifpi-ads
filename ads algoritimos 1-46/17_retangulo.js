import { question } from "readline-sync"

console.log("17. Leia o valor da base e altura de um retângulo, calcule e escreva sua área. (área = base * altura)");

const base = Number(question("Base do triângulo: "));
const altura = Number(question("Altura do triângulo: "))

console.log(`Área: ${base * altura}`);
