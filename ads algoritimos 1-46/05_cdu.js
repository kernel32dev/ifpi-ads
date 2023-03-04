import { question } from "readline-sync"

console.log("5. Leia um número inteiro (3 dígitos), calcule e escreva a soma de seus elementos (C + D + U).");

const numero = Number(question("Número: "));

const unidades = Math.floor(numero * 1) % 10;
const dezenas =  Math.floor(numero * 0.1) % 10;
const centenas = Math.floor(numero * 0.01) % 10;

console.log(`Para CDU ${numero}, C + D + U = ${unidades + dezenas + centenas}`);
