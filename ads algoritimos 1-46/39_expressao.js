import { question } from "readline-sync"

console.log("39. Leia três números inteiros e positivos (A, B, C) e calcule a seguinte expressão: <vede pdf>")

const a = Number(question("Número A: "));
const b = Number(question("Número B: "));
const c = Number(question("Número C: "));

const r = (a + b) * (a + b);
const s = (b + c) * (b + c);
const d = (r + s) * 0.5;

console.log(`D = ${d}`);
