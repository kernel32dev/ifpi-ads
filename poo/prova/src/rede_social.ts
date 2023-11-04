import { RepositorioDePostagens } from "./repositorio_de_postagens";
import { RepositorioDePerfis } from "./repositorio_de_perfis";
import { Perfil } from "./perfil";
import { Postagem } from "./postagem";
import { PostagemAvancada } from "./postagem_avancada";

export class RedeSocial {
    private _postagens: RepositorioDePostagens = new RepositorioDePostagens();
    private _perfis: RepositorioDePerfis = new RepositorioDePerfis();

    gerarIdPerfil(): number {
        return this._perfis.gerarId();
    }
    incluirPerfil(perfil: Perfil) {
        this._perfis.incluir(perfil);
        // TODO! validar
    }
    consultarPerfil(filtros: {
        id?: number | null,
        nome?: string | null,
        email?: string | null,
    }): Perfil | null {
        // TODO! validar
        return this._perfis.consultar(filtros);
    }
    gerarIdPostagem(): number {
        return this._postagens.gerarId();
    }
    incluirPostagem(postagem: Postagem) {
        this._postagens.incluir(postagem);
    }
    consultarPostagem(filtros: {
        id?: number | null,
        texto?: string | null,
        hashtag?: string | null,
        perfil?: Perfil | null,
        popular?: boolean | null,
    }): Postagem[] {
        return this._postagens.consultar(filtros);
    }
    curtir(idPostagem: number) {
        let rows = this._postagens.consultar({id: idPostagem});
        if (rows.length > 0)
            rows[0].curtir();
    }
    descurtir(idPostagem: number) {
        let rows = this._postagens.consultar({id: idPostagem});
        if (rows.length > 0)
            rows[0].descurtir();
    }
    decrementarVisualizacoes(postagem: PostagemAvancada) {
        if (postagem.getVisualizacoesRestantes() > 0)
            postagem.decrementarVisualizacoes();
    }
    exibirPostagensPorPerfil(id: number): Postagem[] {
        let perfil = this._perfis.consultar({id});
        let postagens =  this._postagens.consultar({perfil});
        for (let postagem of postagens) {
            if (postagem instanceof PostagemAvancada) {
                this.decrementarVisualizacoes(postagem);
            }
        }
        return postagens;
    }
    exibirPostagensPorHashtag(hashtag: string): PostagemAvancada[] {
        return this._postagens.consultar({hashtag})
            .map(x => x instanceof PostagemAvancada ? x : null)
            .filter(x => x);
    }
    exibirPostagensPopulares(): Postagem[] {
        return this._postagens.consultar({popular: true});
    }

    serializarParaJson(): any {
        return {
            perfis: this._perfis.serializarParaJson(),
            postagens: this._postagens.serializarParaJson(),
        };
    }

    static deserializarDeJson(json: any): RedeSocial {
        if (typeof json.perfis !== "object") 
            throw new Error("Deserialization Error");

        if (typeof json.postagens !== "object") 
            throw new Error("Deserialization Error");

        let perfis = RepositorioDePerfis.deserializarDeJson(json.perfis);
        let postagens = RepositorioDePostagens.deserializarDeJson(json.postagens, perfis);

        let redeSocial = new RedeSocial();

        redeSocial._perfis = perfis;
        redeSocial._postagens = postagens;

        return redeSocial;
    }
}
