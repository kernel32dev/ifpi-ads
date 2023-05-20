
const input = "120";

function main() {
    const consumo = Number(input);
    const valor = calcula_preco(consumo);
    console.log(valor);
}

function calcula_preco(consumo) {
    const assinatura = 7;
    let range_1 = 0, range_2 = 0, range_5 = 0;
    if (consumo > 100) {
        consumo -= 100;
        range_1 = 20;
        range_2 = 70;
        range_5 = consumo;
    } else if (consumo > 30) {
        consumo -= 30;
        range_1 = 20;
        range_2 = consumo;
    } else if (consumo > 10) {
        consumo -= 10;
        range_1 = consumo;
    }
    return assinatura + range_1 + range_2 * 2 + range_5 * 5;
}

main();
