import { Postagem } from "./postagem";
import { Perfil } from "./perfil";
import { RepositorioDePerfis } from "./repositorio_de_perfis";

export class PostagemAvancada extends Postagem {
    private _hashtags: string[];
    private _visualizacoesRestantes: number;

    constructor(
        id: number,
        texto: string,
        curtidas: number,
        descurtidas: number,
        perfil: Perfil,
        hashtags: string[],
        visualizacoesRestantes: number,
    ) {
        super(id, texto, curtidas, descurtidas, perfil);
        this._hashtags = hashtags;
        this._visualizacoesRestantes = visualizacoesRestantes;
    }

    getHashtags(): string[] { return this._hashtags; }
    getVisualizacoesRestantes(): number { return this._visualizacoesRestantes; }

    adicionarHashtag(hashtag: string) {
        this._hashtags.push(hashtag);
    }
    existeHashtag(hashtag: string): boolean {
        return this._hashtags.indexOf(hashtag) != -1;
    }
    decrementarVisualizacoes() {
        this._visualizacoesRestantes -= 1;
    }

    serializarParaJson(): any {
        return {
            tipo: "PostagemAvancada",
            id: this.getId(),
            texto: this.getTexto(),
            curtidas: this.getCurtidas(),
            descurtidas: this.getDescurtidas(),
            perfil: this.getPerfil().getId(),
            hashtags: this._hashtags,
            visualizacoesRestantes: this._visualizacoesRestantes,
        };
    }
    static deserializarDeJson(json: any, perfis: RepositorioDePerfis): Postagem {
        if (json.tipo !== "PostagemAvancada")
            throw new Error("Deserialization Error");

        if (typeof json.id !== "number" || !Number.isSafeInteger(json.id) || json.id <= 0)
            throw new Error("Deserialization Error");

        if (typeof json.nome !== "string" || json.nome.length == 0)
            throw new Error("Deserialization Error");

        if (typeof json.curtidas !== "number" || !Number.isSafeInteger(json.curtidas) || json.curtidas < 0)
            throw new Error("Deserialization Error");

        if (typeof json.descurtidas !== "number" || !Number.isSafeInteger(json.descurtidas) || json.descurtidas < 0)
            throw new Error("Deserialization Error");

        if (typeof json.perfil !== "number" || !Number.isSafeInteger(json.perfil) || json.perfil <= 0)
            throw new Error("Deserialization Error");

        // TODO! mais checagens
        if (typeof json.hashtags !== "object")
            throw new Error("Deserialization Error");

        if (typeof json.visualizacoesRestantes !== "number" || !Number.isSafeInteger(json.visualizacoesRestantes) || json.visualizacoesRestantes <= 0)
            throw new Error("Deserialization Error");

        let perfil = perfis.consultar(json.perfil);
        if (perfil === null)
            throw new Error("Deserialization Error");

        return new PostagemAvancada(
            json.id,
            json.nome,
            json.curtidas,
            json.descurtidas,
            perfil,
            json.hashtags,
            json.visualizacoesRestantes,
        );
    }
}
