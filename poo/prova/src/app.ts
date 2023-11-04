import { Perfil } from "./perfil";
import { Postagem } from "./postagem";
import { PostagemAvancada } from "./postagem_avancada";
import { RedeSocial } from "./rede_social";
import { askEnter, askInt, askIntOpt, askStr } from "./utils";
import * as fs from 'fs';

const DATABASE = "./db.json";

const MENU_TEXTO = `
REDE SOCIAL
0 - sair
1 - criar perfil
2 - postar
3 - visualizar postagens (TODO!)
4 - visualizar postagens de um perfil
5 - visualizar postagens de um hashtag
6 - visualizar postagens populares
`;
const MENU_NUM = 5;

class App {
    private _rede_social: RedeSocial;
    constructor() {
        this._rede_social = App.carregarDados();
    }

    static main() {
        let app = new App;
        app.executar();
    }

    executar() {
        while (true) {
            console.log(MENU_TEXTO);
            switch (askInt("MENU: ", MENU_NUM)) {
                case 0:
                    this.salvarDados();
                    return;
                case 1: this.criarPerfil(); break;
                case 2: this.criarPostagem(); break;
                case 3: this.visualizarPostagensTodas(); break;
                case 4: this.visualizarPostagensPerfil(); break;
                case 5: this.visualizarPostagensHashtag(); break;
                case 6: this.visualizarPostagensPopulares(); break;
            }
        }
    }

    salvarDados() {
        let json = this._rede_social.serializarParaJson();
        let json_text = JSON.stringify(json, undefined, 4);
        fs.writeFileSync(DATABASE, json_text);
    }

    static carregarDados(): RedeSocial {
        if (!fs.existsSync(DATABASE))
            return new RedeSocial();
        let json_text = fs.readFileSync(DATABASE, "utf8");
        let json = JSON.parse(json_text);
        return RedeSocial.deserializarDeJson(json);
    }

    criarPerfil() {
        console.log("Criando perfil");
        let name = askStr("nome: ");
        if (name.length == 0) {
            console.log("Operação cancelada");
            return;
        }
        let email = askStr("email: ");
        if (email.length == 0) {
            console.log("Operação cancelada");
            return;
        }
        let id = this._rede_social.gerarIdPerfil();
        this._rede_social.incluirPerfil(new Perfil(id, name, email, []));
        console.log("Perfil criado com sucesso");
    }

    criarPostagem() {
        console.log("Criando postagem");
        let perfil = this.escolherPerfil();
        if (perfil == null) {
            console.log("Operação cancelada");
            return;
        }
        let texto = askStr("texto: ");
        if (texto.length == 0) {
            console.log("Operação cancelada");
            return;
        }
        console.log("Limite de visualizações (no máximo 10)\nDeixe vazio para não ter limite");
        let visualizacoes = askIntOpt("limite: ", 10, 1);
        let id = this._rede_social.gerarIdPostagem();
        if (visualizacoes == null) {
            this._rede_social.incluirPostagem(new Postagem(id, texto, 0, 0, perfil));
            console.log("Postagem criada");
        } else {
            let hashtags = Postagem.extrairHashtags(texto);
            this._rede_social.incluirPostagem(new PostagemAvancada(id, texto, 0, 0, perfil, hashtags, visualizacoes));
            console.log("Postagem criada, hashtags: " + hashtags.join(", "));
        }
    }

    visualizarPostagensTodas() {
        throw new Error("TODO!");
    }

    visualizarPostagensPerfil() {
        let perfil = this.escolherPerfil();
        if (perfil == null) return;
        let postagens = this._rede_social.exibirPostagensPorPerfil(perfil.getId());
        this.visualizarPostagens(postagens);
    }

    visualizarPostagensHashtag() {
        let hashtag = askStr("hashtag: ");
        if (hashtag.length == 0) return;
        let postagens = this._rede_social.exibirPostagensPorHashtag(hashtag);
        this.visualizarPostagens(postagens);
    }

    visualizarPostagensPopulares() {
        let postagens = this._rede_social.exibirPostagensPopulares();
        this.visualizarPostagens(postagens);
    }

    visualizarPostagens(postagens: Postagem[]) {
        for (let i = 0; i < postagens.length; i++) {
            let post = postagens[i];
            console.clear();
            console.log(`Postagem ${i + 1} de ${postagens.length}`);
            console.log();
            console.log("@" + post.getPerfil().getNome());
            console.log(post.getTexto());
            console.log();
            console.log("curtidas: " + post.getCurtidas());
            console.log("descurtidas: " + post.getDescurtidas());
            console.log("comandos: (c)urtir (d)escurtir (s)air");
            if (i + 1 != postagens.length) {
                console.log("aperte enter para ver para a próxima postagem");
            } else {
                console.log("aperte enter para sair");
            }
            console.log();
            while (true) {
                let cmd = askStr(">>> ");
                if (cmd == "") {
                    break;
                } else if (cmd == "curtir" || cmd == "c") {
                    post.curtir();
                    console.log("post curtido");
                    askEnter();
                    break;
                } else if (cmd == "descurtir" || cmd == "d") {
                    post.descurtir();
                    console.log("post descurtido");
                    askEnter();
                    break;
                } else if (cmd == "sair" || cmd == "s") {
                    console.clear();
                    return;
                }
                console.log("comandos: (c)urtir (d)escurtir (s)air");
                console.log("comando inválido");
            }
        }
        console.clear();
    }

    escolherPerfil(): Perfil | null {
        while (true) {
            let busca = askStr("Perfil: ");
            if (busca.length === 0) {
                return null;
            }
            let id: number | null = Number(busca);
            if (!Number.isSafeInteger(id) || id <= 0) {
                id = null;
            }
            let perfil = this._rede_social.consultarPerfil({id, nome: busca, email: busca});
            if (perfil != null) {
                return perfil;
            }
            console.log("Perfil " + busca + " não encontrado");
        }
    }
}

App.main();
