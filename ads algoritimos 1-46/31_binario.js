import { question } from "readline-sync"

console.log("31. Leia um número inteiro (4 dígitos binários), calcule e escreva o equivalente na base decimal.");

const digito1 = Number(question("1º dígito (1 ou 0) (esse é o bit menos significante): "));
const digito2 = Number(question("2º dígito (1 ou 0): "));
const digito4 = Number(question("3º dígito (1 ou 0): "));
const digito8 = Number(question("4º dígito (1 ou 0) (esse é o bit mais significante): "));

console.log(`0b${digito1}${digito2}${digito4}${digito8} = ${digito1 * 1 + digito2 * 2 + digito4 * 4 + digito8 * 8}`);
