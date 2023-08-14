import fs from 'node:fs';
import { put } from "./io.js";

// Montadora 
// (id: ULID, nome: string, pais: string, ano_fundacao: int)
// ModeloVeiculo 
// (id: ULID, nome: string, montadora: Montadora, valor_referencia: number, motorizacao: number, turbo: boolean, automatico: boolean)
// Veiculo 
// (id: ULID, modelo: ModeloVeiculo, cor: string, ano_fabricacao: number, ano_modelo: number, valor: number, placa: string)

export function database_load() {
    const montadoras = read_file_safe("montadoras.txt");
    const modelos = read_file_safe("modelos.txt");
    const veiculos = read_file_safe("veiculos.txt");
    const database = {
        montadoras: {},
        modelos: {},
        veiculos: {},
    };
    for (let montadora of parse_text_file(montadoras)) {
        if (montadora === "") continue;
        database.montadoras[montadora[0]] = {
            nome: montadora[1],
            pais: montadora[2],
            ano_fundacao: Number(montadora[3])
        };
    }
    for (let modelo of parse_text_file(modelos)) {
        if (modelo === "") continue;
        const montadora = database.montadoras[modelo[2]];
        if (!montadora) {
            put(`ERRO: Montadora com chave ${modelo[2]} não foi encontrada!`);
            continue;
        }
        database.modelos[modelo[0]] = {
            nome: modelo[1],
            montadora: montadora,
            valor_referencia: Number(modelo[3]),
            motorizacao: Number(modelo[4]),
            turbo: modelo[5] === "T",
            automatico: modelo[6] === "T"
        };
    }
    for (let veiculo of parse_text_file(veiculos)) {
        if (veiculo === "") continue;
        const modelo = database.modelos[veiculo[1]];
        if (!modelo) {
            put(`ERRO: Modelo com chave ${veiculo[1]} não foi encontrado!`);
            continue;
        }
        database.veiculos[veiculo[0]] = {
            modelo: modelo,
            cor: veiculo[2],
            ano_fabricacao: Number(veiculo[3]),
            ano_modelo: Number(veiculo[4]),
            valor: Number(veiculo[5]),
            placa: veiculo[6]
        };
    }
    return database;
}

export function database_save(database) {
    const montadoras = serialize_text_file(database.montadoras, x => [x.nome, x.pais, x.ano_fundacao]);
    const modelos = serialize_text_file(database.modelos, x => [x.nome, x.montadora, x.valor_referencia, x.motorizacao, x.turbo, x.automatico]);
    const veiculos = serialize_text_file(database.veiculos, x => [x.modelo, x.cor, x.ano_fabricacao, x.ano_modelo, x.valor, x.placa]);
    write_file("montadoras.txt", montadoras);
    write_file("modelos.txt", modelos);
    write_file("veiculos.txt", veiculos);
}

function parse_text_file(contents) {
    return contents.split("\n").filter(x => x !== "").map(x => x.split("\t"));
}

function serialize_text_file(dict, into_array_callback) {
    let buffer = "";
    for (let ulid in dict) {
        buffer += ulid + "\t" + into_array_callback(dict[ulid]).join("\t");
    }
    return buffer;
}

function read_file_safe(filename) {
    if (!fs.existsSync(filename)) {
        return "";
    }
    return fs.readFileSync(filename, { encoding: "utf-8" });
}

function write_file(filename, contents) {
    fs.writeFileSync(filename, contents, { encoding: "utf-8" });
}
