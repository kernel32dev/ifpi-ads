import { question } from "readline-sync"

console.log("27. Leia um número inteiro de segundos, calcule e escreva quantas horas, quantos minutos e quantos segundos ele corresponde.");

const segundos_total = Number(question("Segundos: "));

const segundos = segundos_total % 60;
const minutos = Math.floor(segundos_total / 60) % 60;
const horas = Math.floor(segundos_total / (60 * 60));

console.log(`${segundos_total} segundos pode ser escrito como ${horas}:${String(minutos).padStart(2,'0')}:${String(segundos).padStart(2,'0')}`);
