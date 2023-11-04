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
    consultar({id, texto, hashtag, perfil, popular}: {
        id?: number | null,
        texto?: string | null,
        hashtag?: string | null,
        perfil?: Perfil | null,
        popular?: boolean | null,
    }): Postagem[] {
        return this._postagens.filter(x => (
            (typeof id == "number" && x.getId() == id) ||
            (typeof texto == "string" && x.getTexto().indexOf(texto) != -1) ||
            (typeof hashtag == "string" && x instanceof PostagemAvancada && x.getHashtags().indexOf(hashtag) != -1) ||
            (typeof perfil == "object" && x.getPerfil() == perfil) ||
            (typeof popular == "boolean" && x.ehPopular() === popular)
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

            // TODO! mais checagens
        if (typeof json.postagens !== "object")
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
