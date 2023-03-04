import { question } from "readline-sync"

console.log("44. Sabendo que latão é constituído de 70% de cobre e 30% de zinco, escreva um algoritmo que calcule a");
console.log("quantidade de cada um desses componentes para se obter certa quantidade de latão (em kg), informada");
console.log("pelo usuário.");

const latao = Number(question("Latão (kg): "));

const cobre = latao * 0.7;
const zinco = latao * 0.3;

console.log(`Cobre (kg): ${cobre.toFixed(2)}`);
console.log(`Zinco (kg): ${zinco.toFixed(2)}`);
