import { question } from "readline-sync"

console.log("18. Leia o valor do raio de uma circunferĂȘncia, calcule e escreva seu comprimento.(c = 2 * p * r)");

const raio = Number(question("Raio da circunferĂȘncia: "));

console.log(`Comprimento da circunferĂȘncia: ${(2 * Math.PI * raio).toFixed(4)}`);
