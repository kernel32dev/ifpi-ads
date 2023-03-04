import { question } from "readline-sync"

console.log("10. Leia 2 números inteiros, calcule e escreva o quociente e o resto da divisão do 1o pelo 2o.");

const dividendo = Number(question("Dividendo: "));
const divisor = Number(question("Divisor: "));

console.log(`Quando se divide ${dividendo} por ${divisor}, o quociente é ${Math.floor(dividendo / divisor)} e o resto é ${dividendo % divisor}`);
