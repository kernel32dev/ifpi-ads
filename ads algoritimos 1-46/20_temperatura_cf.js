import { question } from "readline-sync"

console.log("20. Leia uma temperatura em °C, calcule e escreva a equivalente em °F. (t°F = (9 * t°C + 160) / 5)");

const celsius = Number(question("celsius (°C): "));
const fahrenheit = (9 * celsius + 160) / 5;

console.log(`fahrenheit (°F): ${fahrenheit.toFixed(2)}`);
