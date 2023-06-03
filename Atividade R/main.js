import { menu } from './menu.js';
import { ask, ask_many, chk_integer, chk_min, chk_range, map_boolean, map_number, put } from './io.js';
import { melhor_linguagem } from './melhor.js';
import { map, filter, reduce, sum, zip, choose_random, sort } from './vec_utils.js';
import { TEST_DICT, Test } from './test.js'

function main() {
    if (ask("Deseja executar os testes?", map_boolean())) {
        Test.test = new Test(TEST_DICT);
    }
    let vetor = [];
    menu({
        /* 1*/ "Gerar vetor N posições, pedir valor padrão": () => vetor = preencher_com_valor(),
        /* 2*/ "Preencher vetor manualmente item a item": () => vetor = preencher_manualmente(),
        /* 3*/ "Preencher vetor automaticamente": () => vetor = preencher_automaticamente(),
        /* 4*/ "Mostrar vetor": () => mostrar_vetor(vetor),
        /* 5*/ "Transformar vetor: elevar a potência N": () => vetor = elevar_todos(vetor),
        /* 6*/ "Contar: Positivos, Negativos e Zeros": () => resumo_contagem(vetor),
        /* 7*/ "Somatório: De todos, Dos Negativos e dos Positivos": () => resumo_somatorio(vetor),
        /* 8*/ "Exibir Média e Mediana: De Todos, Dos Positivos e Dos Negativos": () => mostrar_media_mediana(vetor),
        /* 9*/ "Exibir Maior e Menor número": () => mostrar_maior_menor(vetor),
        /*10*/ "Sortear dois números: um positivo e um negativo": () => sortear_numeros(vetor),
        /*11*/ "Gerar N grupos de T tamanhos, Não repetir valores": () => exibir_grupos(vetor),
        /*12*/ "Pedir um novo vetor e verificar se está 100% presente nos números do sistema (e na mesma ordem)": () => verificar_equivalencia(vetor),
        /*13*/ "Top N maiores números": () => mostrar_maiores(vetor),
        /*14*/ "Top N menores números": () => mostrar_menores(vetor),
        /*15*/ "Listar valor médio, e listar números maiores que a Média e Menores que a Média": () => mostrar_media_detalhado(vetor),
        /*16*/ "Calcular qual a melhor linguagem": () => put(melhor_linguagem()),
        /*17*/ "Somatório da Média dos Números Positivos múltiplos dois COM o Produto acumulado dos números negativos pares reduzidos à metade": () => vetor = demonstracao_calculo_arbitrario(vetor),
        /*18*/ "Ordenar os números em ordem crescente: ": () => vetor = ordenar_crescente(vetor),
        /*19*/ "Ordenar em ordem decrescente": () => vetor = ordenar_decrescente(vetor),
        /*20*/ "Eliminar números múltiplos de N e M (simultaneamente)": () => vetor = elminar_multiplos(vetor),
    });
}

function preencher_com_valor() {
    const quant = ask("Quantidade de itens", map_number(), chk_integer(), chk_min(0));
    const item = ask("Valor de cada um dos itens", map_number());
    return map(Array(quant), _ => item);
}
function preencher_manualmente() {
    put("Informe nada para concluir");
    return ask_many("Item", map_number());
}
function preencher_automaticamente() {
    return map(Array(10), _ => Math.floor(Math.random() * 2000 - 1000));
}
function mostrar_vetor(vetor) {
    put(vetor);
}
function elevar_todos(vetor) {
    const expoente = ask("Expoente", map_number());
    return map(vetor, x => x ** expoente);
}
function resumo_contagem(vetor) {
    const positivos = filter(vetor, x => x > 0).length;
    const negativos = filter(vetor, x => x < 0).length;
    const zeros = filter(vetor, x => x === 0).length;
    put(`número de positivos: ${positivos}`);
    put(`número de negativos: ${negativos}`);
    put(`número de zeros: ${zeros}`);
}
function resumo_somatorio(vetor) {
    const tudo = sum(vetor);
    const positivos = sum(filter(vetor, x => x > 0));
    const negativos = sum(filter(vetor, x => x < 0));
    put(`somatório geral: ${tudo}`);
    put(`somatório dos positivos: ${positivos}`);
    put(`somatório dos negativos: ${negativos}`);
}
function mostrar_media_mediana(vetor) {
    if (vetor.length === 0) {
        put("O vetor está vazio");
        return;
    }
    const media = sum(vetor) / vetor.length;
    put(`média: ${media}`);
    const ordenado = sort(vetor);
    if (ordenado.length % 2 === 0) {
        const mediana = (ordenado[ordenado.length / 2 - 1] + ordenado[ordenado.length / 2]) / 2;
        put(`mediana: ${mediana}`);
    } else {
        const mediana = ordenado[(ordenado.length - 1) / 2];
        put(`mediana: ${mediana}`);
    }
}
function mostrar_maior_menor(vetor) {
    if (vetor.length === 0) {
        put("O vetor está vazio");
        return;
    }
    const maior = reduce(vetor, Math.max);
    const menor = reduce(vetor, Math.min);
    put(`maior: ${maior}`);
    put(`menor: ${menor}`);
}
function sortear_numeros(vetor) {
    const positivos = choose_random(filter(vetor, x => x > 0));
    const negativos = choose_random(filter(vetor, x => x < 0));
    if (positivos !== undefined) {
        put(`um positivo: ${positivos}`);
    } else {
        put("O vetor não tem números positivos");
    }
    if (negativos !== undefined) {
        put(`um negativo: ${negativos}`);
    } else {
        put("O vetor não tem números negativos");
    }
}
function exibir_grupos(vetor) {
    put("Ainda não implementado");
}
function verificar_equivalencia(vetor) {
    put("Informe nada para concluir");
    const informado = ask_many("Item", map_number());
    if (filter(zip(vetor, informado), ([a, b]) => a !== b).length === 0) {
        put("O vetor informado e o vetor atual são identicos");
    } else {
        put("O vetor informado e o vetor atual são diferentes");
    }
}
function mostrar_maiores(vetor) {
    if (vetor.length === 0) {
        put("O vetor está vazio");
        return;
    }
    const n = ask("Quantidade", map_number(), chk_integer(), chk_range(0, vetor.length));
    if (n === 0) return;
    if (n === 1) {
        put(`Maior: ${reduce(vetor, Math.max)}`);
    } else {
        const ordenado = sort(vetor, true);
        put(`${n} maiores:`);
        for (let i = 0; i < n; i++) {
            put(`${i + 1}º: ${ordenado[i]}`);
        }
    }
}
function mostrar_menores(vetor) {
    if (vetor.length === 0) {
        put("O vetor está vazio");
        return;
    }
    const n = ask("Quantidade", map_number(), chk_integer(), chk_range(0, vetor.length));
    if (n === 0) return;
    if (n === 1) {
        put(`Menor: ${reduce(vetor, Math.max)}`);
    } else {
        const ordenado = sort(vetor);
        put(`${n} menores:`);
        for (let i = 0; i < n; i++) {
            put(`${i + 1}º: ${ordenado[i]}`);
        }
    }
}
function mostrar_media_detalhado(vetor) {
    const media = sum(vetor) / vetor.length;
    const maiores = filter(vetor, x => x > media);
    const menores = filter(vetor, x => x < media);
    put(`Média: ${media}`);
    put("Maiores:");
    put(maiores);
    put("Menores:");
    put(menores);
}
function demonstracao_calculo_arbitrario(vetor) {
    if (vetor.length === 0) {
        put("O vetor está vazio");
        return;
    }
    const positivos_pares = filter(vetor, x => x > 0 && x % 2 === 0);
    const negativos_pares = filter(vetor, x => x < 0 && x % 2 === 0);
    const media_positivos_pares = sum(positivos_pares) / vetor.length;
    const produto_metade_negativos_pares = reduce(map(negativos_pares, x => x / 2), (x, y) => x * y);
    const resultado = media_positivos_pares + produto_metade_negativos_pares;
    put("Somatório da média dos números positivos múltiplos dois com o produto acumulado dos números negativos pares reduzidos à metade");
    put(`é igual a ${resultado}`);
}
function ordenar_crescente(vetor) {
    return sort(vetor);
}
function ordenar_decrescente(vetor) {
    return sort(vetor, true);
}
function elminar_multiplos(vetor) {
    const n = ask("Eliminar números multiplos de", map_number(), chk_integer(), chk_min(0));
    const m = ask("e eliminar números multiplos de", map_number(), chk_integer(), chk_min(0));
    return filter(vetor, x => x % n !== 0 && x % m !== 0);
}

main();
