import { question } from "readline-sync"

console.log("32. Leia um número inteiro (3 dígitos), calcule e escreva a diferença entre o número e seu inverso.");

const numero = Number(question("Número: "));

const unidades = Math.floor(numero * 1) % 10;
const dezenas =  Math.floor(numero * 0.1) % 10;
const centenas = Math.floor(numero * 0.01) % 10;

const cdu = (centenas * 100 + dezenas * 10 + unidades * 1);
const udc = (unidades * 100 + dezenas * 10 + centenas * 1);

console.log(`Para CDU ${numero}, CDU - UDC = ${cdu - udc}`);

