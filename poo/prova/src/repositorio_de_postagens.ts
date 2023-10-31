import { Postagem } from "./postagem";
import { PostagemAvancada } from "./postagem_avancada";
import { Perfil } from "./perfil";

export class RepositorioDePostagens {
    private _postagens: Postagem[] = [];

    incluir(postagem: Postagem) {
        this._postagens.push(postagem);
    }
    consultar(
        id: number | null,
        texto?: string | null,
        hashtag?: string | null,
        perfil?: Perfil | null,
    ): Postagem[] {
        return this._postagens.filter(x => (
            (id && x.getId() == id) ||
            (texto && x.getTexto().indexOf(texto) != -1) ||
            (hashtag && x instanceof PostagemAvancada && x.getHashtags().indexOf(hashtag) != -1) ||
            (perfil && x.getPerfil() == perfil)
        ));
    }
}
