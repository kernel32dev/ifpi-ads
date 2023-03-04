import { question } from "readline-sync"

console.log("28. Leia um número inteiro de horas, calcule e escreva quantas semanas, quantos dias e quantas horas ele corresponde.");

const horas_total = Number(question("Horas: "));

const horas = horas_total % 24;
const dias = Math.floor(horas_total / 24) % 7;
const semanas = Math.floor(horas_total / (24 * 7));

console.log(`${horas_total} horas pode ser escrito como ${semanas} semana(s), ${dias} dia(s) e ${horas} hora(s)`);
