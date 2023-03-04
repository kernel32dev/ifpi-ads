import { question } from "readline-sync"

console.log("23. Leia um valor em kg (quilograma), calcule e escreva o equivalente em g (grama).");

const metros = Number(question("metros: "));

console.log(`km: ${(metros * 0.001).toFixed(3)}`);
