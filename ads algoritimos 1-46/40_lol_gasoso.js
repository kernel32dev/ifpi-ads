import { question } from "readline-sync"

console.log("40. Calcule a quantidade de dinheiro gasta por um fumante.");
console.log("Dados de entrada: o número de anos que ele fuma, o no de cigarros fumados por dia e o preço de uma carteira (1 carteira tem 20 cigarros).");

const anos = Number(question("Anos fumando: "));
const cigarros_por_dia = Number(question("Cigarros por dia: "));
const preco_carteira = Number(question("Preço de uma carteira (20 cigarros): "));

const cigarros_total = anos * 365 * cigarros_por_dia;
const carteira_total = cigarros_total / 20;

console.log(`Total gasto: ${carteira_total * preco_carteira}`);
