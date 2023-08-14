import { put, pause, ask, map_number, chk_integer, chk_range } from "./io.js";

/**
 * mostra um menu com os itens passados, e retorna apenas quando o usuário escolhe 0
 * 
 * as chaves do dicionário representam as mensagens a serem mostradas
 * 
 * os valores são funções que serão chamadas quando o usuário escolher essa opção
 * @param {Object} dict 
 */
export function menu(dict) {
    const entries = Object.entries(dict);
    while (true) {
        put("");
        // printa na tela todas as opções
        for (let i = 0; i < entries.length; i++) {
            const [key, _] = entries[i];
            put(`${i + 1}: ${key}`);
        }
        put("0: sair");
        // pede um valor para o usuário
        const escolhido = ask("MENU", map_number(), chk_integer(), chk_range(0, entries.length));
        // trata caso especial, zero
        if (escolhido === 0) {
            put("tchau")
            break;
        }
        // chama a função correspondente
        const [_, callback] = entries[escolhido - 1];
        callback();
        pause();
    }
}
