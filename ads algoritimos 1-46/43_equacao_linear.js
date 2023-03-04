import { question } from "readline-sync"

console.log("43. Um sistema de equações lineares do tipo <vede pdf>, pode ser resolvido segundo mostrado abaixo: <vede pdf>");

console.log("a*x + b*y = c");
console.log("d*x + e*y = f");

const a = Number(question("a: "));
const b = Number(question("b: "));
const c = Number(question("c: "));
const d = Number(question("d: "));
const e = Number(question("e: "));
const f = Number(question("f: "));

console.log(`${a.toFixed(2)} * x + ${b.toFixed(2)} * y = ${c.toFixed(2)}`);
console.log(`${d.toFixed(2)} * x + ${e.toFixed(2)} * y = ${f.toFixed(2)}`);

const x = (c * e - b * f) / (a * e - b * d);
const y = (a * f - c * d) / (a * e - b * d);

console.log(`x: ${x.toFixed(2)}`);
console.log(`y: ${y.toFixed(2)}`);
