import { Perfil } from "./perfil";
import { RepositorioDePerfis } from "./repositorio_de_perfis";

export class Postagem {
    private _id: number;
    private _texto: string;
    private _curtidas: number;
    private _descurtidas: number;
    private _perfil: Perfil;
    private _responde: number | null;

    constructor(
        id: number,
        texto: string,
        curtidas: number,
        descurtidas: number,
        perfil: Perfil,
        responde: number | null,
    ) {
        this._id = id;
        this._texto = texto;
        this._curtidas = curtidas;
        this._descurtidas = descurtidas;
        this._perfil = perfil;
        this._responde = responde;
        perfil.pushPostagem(this);
    }

    getId(): number { return this._id; }
    getTexto(): string { return this._texto; }
    getCurtidas(): number { return this._curtidas; }
    getDescurtidas(): number { return this._descurtidas; }
    getPerfil(): Perfil { return this._perfil; }
    getResponde(): number | null { return this._responde; }

    curtir() {
        this._curtidas += 1;
    }
    descurtir() {
        this._descurtidas += 1;
    }
    ehPopular(): boolean {
        return this._curtidas / this._descurtidas > 1.5;
    }

    // funções virtuais
    getHashtags(): string[] { return []; }
    getVisualizacoesRestantes(): number { return Infinity; }
    adicionarHashtag(_: string) {}
    decrementarVisualizacoes() {}
    existeHashtag(_: string): boolean { return false; }
    ehVisivel(): boolean { return true; }

    static extrairHashtags(texto: string): string[] {
        return texto.split('#').slice(1).flatMap(x => {
            const match = x.match(/^[_\w]+/);
            return (match && match[0]) ? [match[0]] : [];
        });
    }

    serializarParaJson(): any {
        return {
            tipo: "Postagem",
            id: this._id,
            texto: this._texto,
            curtidas: this._curtidas,
            descurtidas: this._descurtidas,
            perfil: this._perfil.getId(),
            responde: this._responde,
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

        if (json.responde != null && (typeof json.responde !== "number" || !Number.isSafeInteger(json.responde) || json.responde <= 0))
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
            json.responde,
        );
    }
}
