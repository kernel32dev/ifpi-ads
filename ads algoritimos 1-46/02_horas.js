import { question } from "readline-sync"

console.log("2. Leia um valor em horas e um valor em minutos, calcule e escreva o equivalente em minutos.");

const horas = Number(question("Número de horas: "));

const minutos = horas * 60;

console.log(`${horas} horas é igual a ${minutos} minutos`);
