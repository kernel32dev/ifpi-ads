import { Postagem } from "./postagem";
import { PostagemAvancada } from "./postagem_avancada";
import { Perfil } from "./perfil";
import { IRepositorioDePerfis } from "./repositorio_de_perfis";
import { DeserializationError } from "./error";

export interface IRepositorioDePostagens {
    incluir(postagem: Postagem): void;
    consultar(filtros: {
        id?: number,
        texto?: string,
        hashtag?: string,
        perfil?: Perfil,
        popular?: boolean,
        visivel?: boolean,
        responde?: number | null,
    }): Postagem[];
    gerarId(): number;
    serializarParaJson(): any;
    deserializarDeJson(json: any, perfis: IRepositorioDePerfis): void;
}

export class RepositorioDePostagensArray implements IRepositorioDePostagens {
    private _postagens: Postagem[] = [];
    private _genId: number = 0;

    incluir(postagem: Postagem): void {
        this._postagens.push(postagem);
    }
    consultar({id, texto, hashtag, perfil, popular, visivel, responde}: {
        id?: number,
        texto?: string,
        hashtag?: string,
        perfil?: Perfil,
        popular?: boolean,
        visivel?: boolean,
        responde?: number | null,
    }): Postagem[] {
        return this._postagens.filter(x => (
            (id === undefined || x.getId() == id) &&
            (texto === undefined || x.getTexto().indexOf(texto) != -1) &&
            (hashtag === undefined || x.existeHashtag(hashtag)) &&
            (perfil === undefined || x.getPerfil() == perfil) &&
            (popular === undefined || x.ehPopular() == popular) &&
            (visivel === undefined || x.ehVisivel() == visivel) &&
            (responde === undefined || x.getResponde() == responde)
        ));
    }
    gerarId(): number {
        return ++this._genId;
    }

    serializarParaJson(): any {
        return {
            postagens: this._postagens.map(x => x.serializarParaJson()),
            genId: this._genId,
        };
    }

    deserializarDeJson(json: any, perfis: IRepositorioDePerfis): void {
        if (typeof json.genId !== "number" || !Number.isSafeInteger(json.genId) || json.id < 0)
            throw new DeserializationError();

        if (typeof json.postagens !== "object" && json.postagens instanceof Array)
            throw new DeserializationError();

        let postagens: Postagem[] = json.postagens.map((x: any) => {
            if (x.tipo === "Postagem") {
                return Postagem.deserializarDeJson(x, perfis);
            } else if (x.tipo === "PostagemAvancada") {
                return PostagemAvancada.deserializarDeJson(x, perfis);
            } else {
                throw new DeserializationError();
            }
        });

        this._genId = json.genId;
        this._postagens = postagens;
    }
}

class PostagemNode {
    postagem: Postagem;
    next: PostagemNode | null;
    constructor(postagem: Postagem, next: PostagemNode | null) {
        this.postagem = postagem;
        this.next = next;
    }
    getPostagem(): Postagem {
        return this.postagem;
    }
    getNext(): PostagemNode | null {
        return this.next;
    }
    setNext(next: PostagemNode | null) {
        this.next = next;
    }
    intoArray(): Postagem[] {
        let arr = [];
        for (let i: PostagemNode | null = this; i; i = i.next) {
            arr.push(i.getPostagem());
        }
        return arr;
    }
    static fromArray(array: Postagem[]): PostagemNode | null {
        if (array.length === 0) {
            return null;
        } else {
            return new PostagemNode(array[0], PostagemNode.fromArray(array.slice(1)));
        }
    }
}

export class RepositorioDePostagensList implements IRepositorioDePostagens {
    private _postagens: PostagemNode | null = null;
    private _genId: number = 0;

    incluir(postagem: Postagem): void {
        this._postagens = new PostagemNode(postagem, this._postagens);
    }
    consultar({id, texto, hashtag, perfil, popular, visivel, responde}: {
        id?: number,
        texto?: string,
        hashtag?: string,
        perfil?: Perfil,
        popular?: boolean,
        visivel?: boolean,
        responde?: number | null,
    }): Postagem[] {
        let filtrado = [];
        for (let node: PostagemNode | null = this._postagens; node; node = node.next) {
            let postagem = node.getPostagem();
            if (
                (id === undefined || postagem.getId() == id) &&
                (texto === undefined || postagem.getTexto().indexOf(texto) != -1) &&
                (hashtag === undefined || postagem.existeHashtag(hashtag)) &&
                (perfil === undefined || postagem.getPerfil() == perfil) &&
                (popular === undefined || postagem.ehPopular() == popular) &&
                (visivel === undefined || postagem.ehVisivel() == visivel) &&
                (responde === undefined || postagem.getResponde() == responde)
            ) {
                filtrado.push(postagem);
            }
        }
        return filtrado;
    }
    gerarId(): number {
        return ++this._genId;
    }

    serializarParaJson(): any {
        let postagens = [];
        if (this._postagens) {
            postagens = this._postagens.intoArray().map(x => x.serializarParaJson());
        }
        return {
            postagens,
            genId: this._genId,
        };
    }

    deserializarDeJson(json: any, perfis: IRepositorioDePerfis): void {
        if (typeof json.genId !== "number" || !Number.isSafeInteger(json.genId) || json.id < 0)
            throw new DeserializationError();

        if (typeof json.postagens !== "object" && json.postagens instanceof Array)
            throw new DeserializationError();

        let postagens: Postagem[] = json.postagens.map((x: any) => {
            if (x.tipo === "Postagem") {
                return Postagem.deserializarDeJson(x, perfis);
            } else if (x.tipo === "PostagemAvancada") {
                return PostagemAvancada.deserializarDeJson(x, perfis);
            } else {
                throw new DeserializationError();
            }
        });

        this._genId = json.genId;
        this._postagens = PostagemNode.fromArray(postagens);
    }
}
