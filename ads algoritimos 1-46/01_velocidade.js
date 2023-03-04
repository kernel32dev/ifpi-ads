import { question } from "readline-sync"

console.log("1. Leia uma velocidade em m/s, calcule e escreva esta velocidade em km/h. (Vkm/h = Vm/s * 3.6)");

const metros_por_segundo = Number(question("Velocidade em m/s: "));

const km_por_hora = metros_por_segundo * 3.6;

console.log(`${metros_por_segundo.toFixed(2)} m/s é igual a ${km_por_hora.toFixed(2)} km/h`);
