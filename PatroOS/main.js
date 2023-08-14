import { database_load, database_save } from "./database.js";
import { put, ask_opt, chk_integer, chk_range, put_table, map_number } from "./io.js";
import { menu } from "./menu.js"
import { ulid } from 'ulidx';

function main() {
    const database = database_load();
    menu({
        "Criar montadora": () => criar_montadora(database),
        "Listar montadoras": () => listar_montadoras(database),
        "Atualizar montadoras": () => atualizar_montadora(database),
        "Remover montadora": () => remover_montadora(database),
        "Status montadoras": () => status_montadora(database),
    });
    database_save(database);
}

function criar_montadora(database) {
    const nome = ask_opt("nome");
    if (nome === undefined) return;
    const pais = ask_opt("pais");
    if (pais === undefined) return;
    const ano_fundacao = ask_opt("ano fundacao", map_number(), chk_integer(), chk_range(1700, 2023));
    if (ano_fundacao === undefined) return;
    const id = ulid();
    database.montadoras[id] = {nome, pais, ano_fundacao};
    put(`Montadora criada, id = ${id}`);
}

function listar_montadoras(database) {
    const objetos = Object.values(database.montadoras);
    if (objetos.length === 0) {
        put("Não há montadoras");
    } else {
        put_table(objetos);
    }
}

function escolher_montadora(database) {
    const entries = Object.entries(database.montadoras);
    if (entries.length === 0) {
        put("Não há montadoras");
        return undefined;
    }
    put("Escolha uma montadora");
    put_table(entries.map(x => x[1]));
    const index = ask_opt("index", map_number(), chk_integer(), chk_range(0, entries.length));
    if (index === undefined) return undefined;
    const id = entries[index][0];
    return id;
}

function atualizar_montadora(database) {
    const id = escolher_montadora(database);
    if (id === undefined) return undefined;
    const obj = database.montadoras[id];

    const nome = ask_opt("nome");
    if (nome !== undefined) obj.nome = nome;
    const pais = ask_opt("pais");
    if (pais !== undefined) obj.pais = pais;
    const ano_fundacao = ask_opt("ano fundacao", map_number(), chk_integer(), chk_range(1700, 2023));
    if (ano_fundacao !== undefined) obj.ano_fundacao = ano_fundacao;

    put(`Montadora atualizada, id = ${id}`);
}

function remover_montadora(database) {
    const id = escolher_montadora(database);
    if (id === undefined) return undefined;
    delete database.montadoras[id];
    put("TODO! APAGAR REGISTROS DEPENDENTES DESTE");
    put(`Montadora removida, id = ${id}`);
}

function status_montadora(database) {
    let length = Object.keys(database).length;
    if (length === 1) {
        put("Existe 1 montadora cadastrada");
    } else {
        put(`Existem ${length} montadoras cadastradas`);
    }
}

main();
