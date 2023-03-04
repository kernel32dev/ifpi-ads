import { question } from "readline-sync"

console.log("19. Leia o valor do raio de uma esfera, calcule e escreva seu volume. (v = (4 * p * r³) / 3) (p = 3,14)");

const raio = Number(question("Raio da esfera: "));

console.log(`Volume da esfera: ${(4 * 3.14 * raio * raio * raio / 3).toFixed(4)}`);
