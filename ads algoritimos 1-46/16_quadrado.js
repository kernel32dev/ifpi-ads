import { question } from "readline-sync"

console.log("16. Leia o valor do lado de um quadrado, calcule e escreva sua área. (área = lado²)");

const lado = Number(question("Lado do quadrado: "));

console.log(`Área: ${lado * lado}`);
