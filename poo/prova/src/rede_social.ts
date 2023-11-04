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
        id?: number,
        nome?: string,
        email?: string,
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
        id?: number,
        texto?: string,
        hashtag?: string,
        perfil?: Perfil,
        popular?: boolean,
        visivel?: boolean,
        responde?: number | null,
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
    exibirPostagens(): Postagem[] {
        let postagens = this._postagens.consultar({visivel: true, responde: null});
        postagens.forEach(x => x.decrementarVisualizacoes());
        return postagens;
    }
    exibirPostagensPorPerfil(idPerfil: number): Postagem[] {
        let perfil = this._perfis.consultar({id: idPerfil});
        if (perfil === null) return [];
        let postagens =  this._postagens.consultar({perfil, visivel: true});
        for (let postagem of postagens) {
            if (postagem instanceof PostagemAvancada) {
                this.decrementarVisualizacoes(postagem);
            }
        }
        return postagens;
    }
    exibirPostagensPorHashtag(hashtag: string): PostagemAvancada[] {
        let postagens = [];
        for (let postagem of this._postagens.consultar({hashtag, visivel: true})) {
            if (postagem instanceof PostagemAvancada) postagens.push(postagem);
        }
        postagens.forEach(x => x.decrementarVisualizacoes());
        return postagens;
    }
    exibirPostagensPopulares(): Postagem[] {
        let postagens = this._postagens.consultar({popular: true, visivel: true});
        postagens.forEach(x => x.decrementarVisualizacoes());
        return postagens;
    }
    exibirHashtagsPopulares(): {count: number, hashtag: string}[] {
        let map = new Map<string, number>();
        for (let hashtag of this._postagens.consultar({visivel: true}).flatMap(x => x.getHashtags())) {
            let count = map.get(hashtag) || 0;
            map.set(hashtag, count + 1);
        }
        let arr = [];
        for (let [hashtag, count] of map) {
            arr.push({hashtag, count});
        }
        arr.sort((a, b) => b.count - a.count);
        return arr;
    }
    exibirPerfisPopulares(): Perfil[] {
        let arr = this._perfis.listar().map(perfil => ({
            perfil, karma: perfil.getPostagens().filter(x => x.ehVisivel()).reduce((acc, x) => acc + x.getCurtidas() - x.getDescurtidas(), 0),
        }));
        arr.sort((a, b) => b.karma - a.karma);
        return arr.map(x => x.perfil);
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
