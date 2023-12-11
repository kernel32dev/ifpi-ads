import { IRepositorioDePostagens } from "./repositorio_de_postagens";
import { IRepositorioDePerfis } from "./repositorio_de_perfis";
import { Perfil } from "./perfil";
import { Postagem } from "./postagem";
import { PostagemAvancada } from "./postagem_avancada";
import { DeserializationError, IdEmUsoError, PerfilNaoEncontradoError, PostagemNaoEncontradaError } from "./error";

export class RedeSocial {
    private _postagens: IRepositorioDePostagens;
    private _perfis: IRepositorioDePerfis;

    constructor(postagens: IRepositorioDePostagens, perfis: IRepositorioDePerfis) {
        this._postagens = postagens;
        this._perfis = perfis;
    }

    gerarIdPerfil(): number {
        return this._perfis.gerarId();
    }
    incluirPerfil(perfil: Perfil) {
        try {
            this._perfis.consultar({id: perfil.getId()});
            throw new IdEmUsoError();
        } catch (error) {
            if (error instanceof PerfilNaoEncontradoError) {
                this._perfis.incluir(perfil);
            } else {
                throw error;
            }
        }
    }
    consultarPerfil(filtros: {
        id?: number,
        nome?: string,
        email?: string,
    }): Perfil {
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
        if (rows.length > 0) {
            rows[0].curtir();
        } else {
            throw new PostagemNaoEncontradaError();
        }
    }
    descurtir(idPostagem: number) {
        let rows = this._postagens.consultar({id: idPostagem});
        if (rows.length > 0) {
            rows[0].descurtir();
        } else {
            throw new PostagemNaoEncontradaError();
        }
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

    deserializarDeJson(json: any) {
        if (typeof json.perfis !== "object") 
            throw new DeserializationError();

        if (typeof json.postagens !== "object") 
            throw new DeserializationError();

        this._perfis.deserializarDeJson(json.perfis);
        this._postagens.deserializarDeJson(json.postagens, this._perfis);
    }
}
