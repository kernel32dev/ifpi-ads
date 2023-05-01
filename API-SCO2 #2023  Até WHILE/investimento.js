import {log, question_string, question_float} from './utils.js';

function main() {
    log("Dica: aperte enter com o campo vazio para usar o valor padrão");
    const objetivo = question_string("Qual o seu objetivo com o seu investimento?", "comprar muito Dogecoin");
    const objetivo_valor_necessario = question_float("Quanto dinheiro precisa para realizar o objetivo?", 1_000_000, 0, undefined);

    if (objetivo_valor_necessario === 0) {
        log("Você pode alcançar o seu objetivo sem investir nada! :D");
        return;
    }

    const salario = question_float("Qual o seu salario?", 3_000, 0, undefined);

    if (salario === 0) {
        log("Sem um salário fica difícil fazer alguma coisa :T");
        return;
    }

    const investimento_mensal = question_float("Quanto do seu salario você vai investir por mes? (%)", 5, 1, 100) * salario / 100;
    const juros_mensal = question_float("Qual a taxa de juros do seu investimento? (%)", 1, 0.01, 1);

    log(`Investindo mensalmente ${investimento_mensal.toFixed(2)}...`);

    let investido = 0;
    let numero_mes = 0;
    let numero_ano = 0;
    while (investido < objetivo_valor_necessario) {
        numero_mes += 1;
        if (numero_mes === 12) {
            numero_mes = 0;
            numero_ano += 1;
        }
        // adiciona o investimento
        investido += investimento_mensal;
        // e então aplica o juros
        investido += investido * juros_mensal / 100;
        const mensagem_de_tempo = gera_mensagem_de_tempo(numero_ano, numero_mes);
        log(`Após ${mensagem_de_tempo} você terá ${investido.toFixed(2)}`);
    }
    log(`E então você poderá ${objetivo}! :D`);
}

function gera_mensagem_de_tempo(anos, meses) {
    let anos_texto = null;
    let meses_texto = null;
    if (anos == 1) {
        anos_texto = "1 ano";
    } else if (anos > 1) {
        anos_texto = anos + " anos";
    }
    if (meses == 1) {
        meses_texto = "1 mês";
    } else if (meses > 1) {
        meses_texto = meses + " mêses";
    }
    if (anos_texto !== null && meses_texto !== null) {
        return anos_texto + " e " + meses_texto;
    } else if (anos_texto !== null) {
        return anos_texto;
    } else if (meses_texto !== null) {
        return meses_texto;
    }
    
}

main();
