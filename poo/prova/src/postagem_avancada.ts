import { Postagem } from "./postagem";
import { Perfil } from "./perfil";

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
}
