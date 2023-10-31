import { RepositorioDePostagens } from "./repositorio_de_postagens";
import { RepositorioDePerfis } from "./repositorio_de_perfis";
import { Perfil } from "./perfil";
import { Postagem } from "./postagem";
import { PostagemAvancada } from "./postagem_avancada";

export class RedeSocial {
    private _postagens: RepositorioDePostagens = new RepositorioDePostagens();
    private _perfis: RepositorioDePerfis = new RepositorioDePerfis();

    incluirPerfil(perfil: Perfil) {
        this._perfis.incluir(perfil);
        // TODO! validar
    }
    consultarPerfil(
        id: number | null,
        nome: string | null,
        email: string | null,
    ): Perfil | null {
        // TODO! validar
        return this._perfis.consultar(id, nome, email);
    }
    incluir(postagem: Postagem) {
        this._postagens.incluir(postagem);
    }
    consultar(
        id: number | null,
        texto?: string | null,
        hashtag?: string | null,
        perfil?: Perfil | null,
    ): Postagem[] {
        return this._postagens.consultar(id, texto, hashtag, perfil);
    }
    curtir(idPostagem: number) {
        let rows = this._postagens.consultar(idPostagem);
        if (rows.length > 0)
            rows[0].curtir();
    }
    descurtir(idPostagem: number) {
        let rows = this._postagens.consultar(idPostagem);
        if (rows.length > 0)
            rows[0].descurtir();
    }
    decrementarVisualizacoes(postagem: PostagemAvancada) {
        if (postagem.getVisualizacoesRestantes() > 0)
            postagem.decrementarVisualizacoes();
    }
    exibirPostagensPorPerfil(id: number): Postagem[] {
        let perfil = this._perfis.consultar(id);
        let postagens =  this._postagens.consultar(null, null, null, perfil);
        for (let postagem of postagens) {
            if (postagem instanceof PostagemAvancada) {
                this.decrementarVisualizacoes(postagem);
            }
        }
        return postagens;
    }
    exibirPostagensPorHashtag(hashtag: string): PostagemAvancada[] {
        return this._postagens.consultar(null, null, hashtag, null)
            .map(x => x instanceof PostagemAvancada ? x : null)
            .filter(x => x);
    }
}
