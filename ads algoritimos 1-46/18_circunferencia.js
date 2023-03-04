import { question } from "readline-sync"

console.log("18. Leia o valor do raio de uma circunferência, calcule e escreva seu comprimento.(c = 2 * p * r)");

const raio = Number(question("Raio da circunferência: "));

console.log(`Comprimento da circunferência: ${(2 * Math.PI * raio).toFixed(4)}`);
