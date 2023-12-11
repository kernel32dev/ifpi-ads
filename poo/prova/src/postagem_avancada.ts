import { Postagem } from "./postagem";
import { Perfil } from "./perfil";
import { IRepositorioDePerfis } from "./repositorio_de_perfis";
import { DeserializationError } from "./error";

export class PostagemAvancada extends Postagem {
    private _hashtags: string[];
    private _visualizacoesRestantes: number;

    constructor(
        id: number,
        texto: string,
        curtidas: number,
        descurtidas: number,
        perfil: Perfil,
        responde: number | null,
        hashtags: string[],
        visualizacoesRestantes: number,
    ) {
        super(id, texto, curtidas, descurtidas, perfil, responde);
        this._hashtags = hashtags;
        this._visualizacoesRestantes = visualizacoesRestantes;
    }

    override getHashtags(): string[] { return this._hashtags; }
    override getVisualizacoesRestantes(): number { return this._visualizacoesRestantes; }
    override adicionarHashtag(hashtag: string) {
        this._hashtags.push(hashtag);
    }
    override decrementarVisualizacoes() {
        this._visualizacoesRestantes -= 1;
    }
    override existeHashtag(hashtag: string): boolean {
        return this._hashtags.indexOf(hashtag) != -1;
    }
    override ehVisivel(): boolean {
        return this._visualizacoesRestantes > 0;
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
    static deserializarDeJson(json: any, perfis: IRepositorioDePerfis): Postagem {
        if (json.tipo !== "PostagemAvancada")
            throw new DeserializationError();

        if (typeof json.id !== "number" || !Number.isSafeInteger(json.id) || json.id <= 0)
            throw new DeserializationError();

        if (typeof json.texto !== "string" || json.texto.length == 0)
            throw new DeserializationError();

        if (typeof json.curtidas !== "number" || !Number.isSafeInteger(json.curtidas) || json.curtidas < 0)
            throw new DeserializationError();

        if (typeof json.descurtidas !== "number" || !Number.isSafeInteger(json.descurtidas) || json.descurtidas < 0)
            throw new DeserializationError();

        if (typeof json.perfil !== "number" || !Number.isSafeInteger(json.perfil) || json.perfil <= 0)
            throw new DeserializationError();

        if (json.responde != null && (typeof json.responde !== "number" || !Number.isSafeInteger(json.responde) || json.responde <= 0))
            throw new DeserializationError();

        if (typeof json.hashtags !== "object" && json.hashtags instanceof Array)
            throw new DeserializationError();

        if (typeof json.visualizacoesRestantes !== "number" || !Number.isSafeInteger(json.visualizacoesRestantes) || json.visualizacoesRestantes < 0)
            throw new DeserializationError();

        let perfil = perfis.consultar({id: json.perfil});

        return new PostagemAvancada(
            json.id,
            json.texto,
            json.curtidas,
            json.descurtidas,
            perfil,
            json.responde,
            json.hashtags,
            json.visualizacoesRestantes,
        );
    }
}
