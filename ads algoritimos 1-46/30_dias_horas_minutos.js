import { question } from "readline-sync"

console.log("30. Leia um número inteiro de minutos, calcule e escreva quantos dias, quantas horas e quantos minutos ele corresponde.");

const minutos_total = Number(question("Minutos: "));

const dias = Math.floor(minutos_total / (24 * 60));
const horas = Math.floor(minutos_total / 60) % 24;
const minutos = minutos_total % (24 * 60);

console.log(`${minutos_total} minutos pode ser escrito como ${dias} dia(s), ${horas} hora(s) e ${minutos} minuto(s)`);
