import { question } from "readline-sync"

console.log("6. Leia uma velocidade em km/h, calcule e escreva esta velocidade em m/s. (Vm/s = Vkm/h / 3.6)");

const km_por_hora = Number(question("Velocidade em m/s: "));

const metros_por_segundo = km_por_hora / 3.6;

console.log(`${km_por_hora.toFixed(2)} km/h é igual a ${metros_por_segundo.toFixed(2)} m/s`);
