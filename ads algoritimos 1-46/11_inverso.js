import { question } from "readline-sync"

console.log("11. Leia um número inteiro (3 dígitos) e escreva o inverso do número. (Ex.: número = 532 ; inverso = 235)");

const numero = Number(question("Número: "));

const unidades = Math.floor(numero * 1) % 10;
const dezenas =  Math.floor(numero * 0.1) % 10;
const centenas = Math.floor(numero * 0.01) % 10;

console.log(`Para CDU ${numero}, UDC = ${unidades * 100 + dezenas * 10 + centenas * 1}`);
