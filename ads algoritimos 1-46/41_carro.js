import { question } from "readline-sync"

console.log("41. O custo ao consumidor de um carro novo é a soma do custo de fábrica com a percentagem do");
console.log("distribuidor e dos impostos (aplicados ao custo de fábrica). Supondo que a percentagem do distribuidor");
console.log("seja de 28% e os impostos de 45%, escreva um algoritmo que leia o custo de fábrica de um carro e");
console.log("escreva o custo ao consumidor.");

const custo_de_fabrica = Number(question("Custo de fábrica de um carro: "));
const parcela_do_distribuidor = custo_de_fabrica * 0.28;
const imposto = custo_de_fabrica * 0.45; // assumindo que o imposto é sobre o custo de fabrica
//const imposto = (custo_de_fabrica + parcela_do_distribuidor) * 0.45; // assumindo que o imposto é sobre o que o distribuidor vende

console.log(`Custo para o consumidor: ${custo_de_fabrica + parcela_do_distribuidor + imposto}`);
