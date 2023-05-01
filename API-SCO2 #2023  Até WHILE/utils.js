import { question } from "readline-sync";

export function log(mensagem) {
    console.log(mensagem);
}

export function question_string(mensagem, valor_padrao) {
    if (valor_padrao !== undefined) {
        mensagem += ` (${valor_padrao})`;
    }
    while (true) {
        let texto = question(mensagem + ": ");
        if (texto.length === 0) {
            if (valor_padrao !== undefined) {
                return valor_padrao;
            }
            log("Este campo não pode ser vazio.");
            continue;
        }
        return texto;
    }
}

export function question_float(mensagem, valor_padrao, min, max) {
    if (min !== undefined && max !== undefined) {
        mensagem += ` (${min} .. ${max})`;
    } else if (min !== undefined) {
        mensagem += ` ( >= ${min} )`;
    } else if (max !== undefined) {
        mensagem += ` ( <= ${min} )`;
    }
    while (true) {
        let texto = question_string(mensagem, valor_padrao);
        if (texto === null) {
            log("Este campo não pode ser vazio.");
            continue;
        }
        let numero = Number(texto);
        if (Number.isNaN(numero)) {
            log("Insira um número válido");
            continue;
        }
        if (min !== undefined && numero < min) {
            log("Este campo tem de ser no mínimo " + min);
            continue;
        }
        if (max !== undefined && numero > max) {
            log("Este campo tem de ser no máximo " + max);
            continue;
        }
        return numero;
    }
}

export function question_integer(mensagem, valor_padrao, min, max) {
    while (true) {
        let numero = question_float(mensagem, valor_padrao, min, max);
        if (!Number.isInteger(numero)) {
            log("Insira um número inteiro");
            continue;
        }
        return numero;
    }
}
