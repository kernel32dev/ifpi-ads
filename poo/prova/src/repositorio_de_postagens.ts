import { Postagem } from "./postagem";
import { PostagemAvancada } from "./postagem_avancada";
import { Perfil } from "./perfil";
import { RepositorioDePerfis } from "./repositorio_de_perfis";

export class RepositorioDePostagens {
    private _postagens: Postagem[] = [];
    private _genId: number = 0;

    incluir(postagem: Postagem) {
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

    static deserializarDeJson(json: any, perfis: RepositorioDePerfis): RepositorioDePostagens {
        if (typeof json.genId !== "number" || !Number.isSafeInteger(json.genId) || json.id < 0)
            throw new Error("Deserialization Error");

        if (typeof json.postagens !== "object" && json.postagens instanceof Array)
            throw new Error("Deserialization Error");

        let postagens: Postagem[] = json.postagens.map((x: any) => {
            if (x.tipo === "Postagem") {
                return Postagem.deserializarDeJson(x, perfis);
            } else if (x.tipo === "PostagemAvancada") {
                return PostagemAvancada.deserializarDeJson(x, perfis);
            } else {
                throw new Error("Deserialization Error");
            }
        });

        let repo = new RepositorioDePostagens();

        repo._genId = json.genId;
        repo._postagens = postagens;

        return repo;
    }
}
