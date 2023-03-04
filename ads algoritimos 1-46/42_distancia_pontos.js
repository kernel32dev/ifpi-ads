import { question } from "readline-sync"

console.log("42. Escreva um algoritmo que, tendo como dados de entrada 2 pontos quaisquer no plano, ponto1 (x1,y1) e");
console.log("ponto2 (x2,y2), escreva a distância entre eles, conforme fórmula abaixo. <vede pdf>");

const x1 = Number(question("x1: "));
const y1 = Number(question("y1: "));
const x2 = Number(question("x2: "));
const y2 = Number(question("y2: "));

const distancia = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

console.log(`A distância entre [${x1},${y1}] e [${x2},${y2}] é ${distancia}`);
