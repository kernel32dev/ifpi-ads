import { question } from 'readline-sync';
import { str_replace } from './string_utils.js';

function internal_question(prompt) {
    return question(prompt);
}

export function put(msg) {
    console.log(msg);
}

export function put_table(msg) {
    console.table(msg);
}

export function pause(msg) {
    internal_question("Aperte enter para continuar...");
}

/**
 * essa função pede um dado ao usuário, dado as condições em predicates
 * 
 * um predicate é uma função que transforma e valída o código
 *
 * ela retorna o valor transformado, mas caso o valor não possa ser transformado, retorna um BadValue
 *
 * isso permite código extremamente simples e legível
 *
 * ```
 * // obtem um número inteiro, que pode ir de 0 a n
 * const n = ...;
 * const item_do_menu = ask("idade", map_number(), filter_integer(), filter_range(0, n))
 * ```
 */
export function ask(prompt, ...predicates) {
    ask_loop: while (true) {
        let value = internal_question(prompt + ": ");
        for (let predicate of predicates) {
            value = predicate(value);
            if (value instanceof BadValue) {
                // o predicate falhou, printa o erro e tenta de novo
                put(value.err);
                continue ask_loop;
            }
        }
        // todos os predicates deram certo
        return value;
    }
}

/**
 * mesma coisa que ask, mas pede várias vezes, e para apenas quando o usuário passar vazio
 * 
 * retorna um array
 */
export function ask_many(prompt, ...predicates) {
    const arr = [];
    ask_loop: while (true) {
        let value = internal_question(prompt + ": ");
        if (value.length === 0) {
            break;
        }
        for (let predicate of predicates) {
            value = predicate(value);
            if (value instanceof BadValue) {
                // o predicate falhou, printa o erro e tenta de novo
                put(value.err);
                continue ask_loop;
            }
        }
        // todos os predicates deram certo
        arr[arr.length] = value;
    }
    return arr;
}

/**
 * mesma coisa que ask, mas se o usuário não passar nada, a função retorna undefined
 */
export function ask_opt(prompt, ...predicates) {
    ask_loop: while (true) {
        let value = internal_question(prompt + ": ");
        if (value.length === 0) {
            return undefined;
        }
        for (let predicate of predicates) {
            value = predicate(value);
            if (value instanceof BadValue) {
                // o predicate falhou, printa o erro e tenta de novo
                put(value.err);
                continue ask_loop;
            }
        }
        // todos os predicates deram certo
        return value;
    }
}

export function BadValue(msg) {
    this.err = msg;
}

export function map_boolean(msg = "Responda sim ou não") {
    return value => {
        switch (value) {
            case "Y": case "y":
            case "S": case "s":
            case "SIM": case "Sim": case "sim":
            case "YES": case "Yes": case "yes":
                return true;
            case "N": case "n":
            case "NO": case "No": case "no":
            case "NÃO": case "Não": case "não":
            case "NAO": case "Nao": case "nao":
                return false;
            default: 
                return new BadValue(msg);
        }
    }
}

export function map_number(msg = "Escolha um número válido") {
    return value => {
        const number = Number(value);
        if (!Number.isNaN(number)) {
            return number;
        }
        return new BadValue(msg);
    }
}

export function chk_integer(msg = "Escolha um número inteiro") {
    return value => {
        if (Number.isSafeInteger(value)) {
            return value;
        }
        return new BadValue(msg);
    }
}

export function chk_min(minimum, msg = "Esperado no mínimo @1") {
    msg = str_replace(msg, "@1", String(minimum));
    return value => {
        if (value >= minimum) {
            return value;
        }
        return new BadValue(msg);
    }
}

export function chk_max(maximum, msg = "Esperado no máximo @1") {
    msg = str_replace(msg, "@1", String(maximum));
    return value => {
        if (value <= maximum) {
            return value;
        }
        return new BadValue(msg);
    }
}

export function chk_range(minimum, maximum, msg = "Esperado um número entre @1 e @2") {
    msg = str_replace(msg, "@1", String(minimum));
    msg = str_replace(msg, "@2", String(maximum));
    return value => {
        if (minimum <= value && value <= maximum) {
            return value;
        }
        return new BadValue(msg);
    }
}
