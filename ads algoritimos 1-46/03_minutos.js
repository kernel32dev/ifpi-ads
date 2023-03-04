import { question } from "readline-sync"

console.log("3. Leia um valor em minutos, calcule e escreva o equivalente em horas e minutos.");

const minutos_total = Number(question("Minutos: "));

const minutos = minutos_total % 60;
const horas = minutos_total / 60;

console.log(`${minutos_total} minutos pode ser escrito como ${horas}:${String(minutos).padStart(2,'0')}`);
