import { question } from "readline-sync"

console.log("21. Leia uma temperatura em °F, calcule e escreva a equivalente em °C. (t°C = (5 * t°F - 160) / 9).");

const fahrenheit = Number(question("fahrenheit (°F): "));
const celsius = (5 * fahrenheit - 160) / 9;

console.log(`celsius (°C): ${celsius.toFixed(2)}`);
