import { Perfil } from "./perfil";
import { RepositorioDePerfis } from "./repositorio_de_perfis";

export class Postagem {
    private _id: number;
    private _texto: string;
    private _curtidas: number;
    private _descurtidas: number;
    private _perfil: Perfil;

    constructor(
        id: number,
        texto: string,
        curtidas: number,
        descurtidas: number,
        perfil: Perfil,
    ) {
        this._id = id;
        this._texto = texto;
        this._curtidas = curtidas;
        this._descurtidas = descurtidas;
        this._perfil = perfil;
    }

    getId(): number { return this._id; }
    getTexto(): string { return this._texto; }
    getCurtidas(): number { return this._curtidas; }
    getDescurtidas(): number { return this._descurtidas; }
    getPerfil(): Perfil { return this._perfil; }

    curtir() {
        this._curtidas += 1;
    }
    descurtir() {
        this._descurtidas += 1;
    }
    ehPopular(): boolean {
        return this._curtidas / this._descurtidas > 1.5;
    }

    static extrairHashtags(texto: string): string[] {
        // TODO!
        return ["TODO!"];
    }

    serializarParaJson(): any {
        return {
            tipo: "Postagem",
            id: this._id,
            texto: this._texto,
            curtidas: this._curtidas,
            descurtidas: this._descurtidas,
            perfil: this._perfil.getId(),
        };
    }
    static deserializarDeJson(json: any, perfis: RepositorioDePerfis): Postagem {
        if (json.tipo !== "Postagem")
            throw new Error("Deserialization Error");

        if (typeof json.id !== "number" || !Number.isSafeInteger(json.id) || json.id <= 0)
            throw new Error("Deserialization Error");

        if (typeof json.texto !== "string" || json.texto.length == 0)
            throw new Error("Deserialization Error");

        if (typeof json.curtidas !== "number" || !Number.isSafeInteger(json.curtidas) || json.curtidas < 0)
            throw new Error("Deserialization Error");

        if (typeof json.descurtidas !== "number" || !Number.isSafeInteger(json.descurtidas) || json.descurtidas < 0)
            throw new Error("Deserialization Error");

        if (typeof json.perfil !== "number" || !Number.isSafeInteger(json.perfil) || json.perfil <= 0)
            throw new Error("Deserialization Error");

        let perfil = perfis.consultar({id: json.perfil});
        if (perfil === null)
            throw new Error("Deserialization Error");

        return new Postagem(
            json.id,
            json.texto,
            json.curtidas,
            json.descurtidas,
            perfil,
        );
    }
}
