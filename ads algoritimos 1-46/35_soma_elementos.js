import { question } from "readline-sync"

console.log("35. Leia um número inteiro (4 dígitos), calcule e escreva a soma dos elementos que o compõem.")

const numero = Number(question("Número: "));

const unidades = Math.floor(numero * 1) % 10;
const dezenas =  Math.floor(numero * 0.1) % 10;
const centenas = Math.floor(numero * 0.01) % 10;
const milhar =   Math.floor(numero * 0.001) % 10;

console.log(`Para MCDU ${numero}, M + C + D + U = ${unidades + dezenas + centenas + milhar}`);
