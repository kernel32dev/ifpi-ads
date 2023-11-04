import { Auth } from "./auth";
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
2 - escrever postagem
3 - visualizar postagens
4 - visualizar postagens de um perfil
5 - visualizar postagens de um hashtag
6 - visualizar postagens populares
7 - visualizar hashtags populares
8 - visualizar perfis populares
9 - gerar perfil aleatório
`;
const MENU_NUM = 9;

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
                case 0: this.salvarDados(); return;
                case 1: this.criarPerfil(); break;
                case 2: this.criarPostagem(); break;
                case 3: this.visualizarPostagensTodas(); break;
                case 4: this.visualizarPostagensPerfil(); break;
                case 5: this.visualizarPostagensHashtag(); break;
                case 6: this.visualizarPostagensPopulares(); break;
                case 7: this.visualizarHashtagsPopulares(); break;
                case 8: this.visualizarPerfisPopulares(); break;
                case 9: this.gerarPerfilAleatorio(); break;
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
        let auth = null;
        let senha = askStr("senha (opcional): ");
        if (senha.length != 0) {
            auth = Auth.gerar(senha);
        }
        let id = this._rede_social.gerarIdPerfil();
        this._rede_social.incluirPerfil(new Perfil(id, name, email, auth, []));
        console.log("Perfil criado com sucesso");
    }

    criarPostagem(responde: number | null = null) {
        console.log(responde == null ? "Escrever postagem" : "Escrever resposta");
        let perfil = this.escolherPerfil();
        if (perfil == null) {
            console.log("Operação cancelada");
            return;
        }
        let auth = perfil.getAuth();
        if (auth) {
            let resultado = this.exigirSenha(auth);
            if (resultado === null) {
                console.log("Operação cancelada");
                return;
            } else if (resultado === false) {
                console.log("Operação cancelada - credenciais incorretas");
                return;
            }
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
            this._rede_social.incluirPostagem(new Postagem(id, texto, 0, 0, perfil, responde));
            console.log("Postagem criada");
        } else {
            let hashtags = Postagem.extrairHashtags(texto);
            this._rede_social.incluirPostagem(new PostagemAvancada(id, texto, 0, 0, perfil, responde, hashtags, visualizacoes));
            console.log("Postagem criada, hashtags: " + hashtags.join(", "));
        }
    }

    visualizarPostagensTodas() {
        let postagens = this._rede_social.exibirPostagens();
        this.visualizarPostagens(postagens);
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
        if (postagens.length == 0) {
            console.clear();
            console.log("\nNenhuma postagem encontrada\n");
            askEnter();
            console.clear();
            return;
        }
        for (let i = 0; i < postagens.length; i++) {
            let post = postagens[i];
            console.clear();
            console.log(`Postagem ${i + 1} de ${postagens.length}`);
            this.visualizarPostagem(post);
            let responde = post.getResponde();
            if (responde != null) {
                let respondido = this._rede_social.consultarPostagem({id: responde});
                if (respondido.length != 0) {
                    this.visualizarPostagem(respondido[0], "respondendo: ");
                }
            }
            let respostas = this._rede_social.consultarPostagem({responde: post.getId()});
            if (respostas.length != 0) {
                console.log("\nrespostas:");
                for (let resposta of respostas) {
                    this.visualizarPostagem(resposta);
                }
            }
            console.log("\ncurtidas: " + post.getCurtidas());
            console.log("descurtidas: " + post.getDescurtidas());
            console.log("comandos: (r)esponder (c)urtir (d)escurtir (s)air");
            if (i + 1 != postagens.length) {
                console.log("aperte enter para ver para a próxima postagem");
            } else {
                console.log("aperte enter para sair");
            }
            while (true) {
                console.log();
                let cmd = askStr(">>> ");
                if (cmd == "") {
                    break;
                } else if (cmd == "responder" || cmd == "r") {
                    this.criarPostagem(post.getId());
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
                } else if (cmd == "sair" || cmd == "s" || cmd == "quit" || cmd == "q") {
                    console.clear();
                    return;
                }
                console.log("comandos: (c)urtir (d)escurtir (s)air");
                console.log("comando inválido");
            }
        }
        console.clear();
    }
    visualizarPostagem(post: Postagem, caption: string = "") {
        console.log("\n" + caption + "@" + post.getPerfil().getNome());
        console.log(" " + post.getTexto().replace(/\n/g, " \n"));
    }

    visualizarHashtagsPopulares() {
        console.log();
        let hashtags = this._rede_social.exibirHashtagsPopulares();
        hashtags.forEach(({count, hashtag}, index) => {
            console.log(`${index + 1}º #${hashtag} (${count})`);
        });
        console.log();
        let index = askIntOpt("Ver postagens da hashtag na posição Nº: ", hashtags.length, 1);
        if (index == 0 || index == null) {
            return;
        }
        let hashtag = hashtags[index - 1].hashtag;
        let postagens = this._rede_social.exibirPostagensPorHashtag(hashtag);
        this.visualizarPostagens(postagens);
    }

    visualizarPerfisPopulares() {
        console.log();
        let perfis = this._rede_social.exibirPerfisPopulares();
        perfis.forEach((perfil, index) => {
            console.log(`${index + 1}º #${perfil.getNome()}`);
        });
        console.log();
        let index = askIntOpt("Ver postagens do perfil na posição Nº: ", perfis.length, 1);
        if (index == 0 || index == null) {
            return;
        }
        let postagens = this._rede_social.exibirPostagensPorPerfil(perfis[index - 1].getId());
        this.visualizarPostagens(postagens);
    }

    gerarPerfilAleatorio() {
        const NOMES = ["geraldo", "fabio", "cristina", "cleiton", "marlene", "napoleon", "cleberson", "sanatiel", "augusto", "rafael", "rodrigo", "sheila", "carminha", "clotildes"];
        const RESPOSTAS = [
            "fake news",
            "discordo",
            "falso, leia um livro por favor",
            "sinceramente, discordo",
            "você faz parte do problema",
            "tú é acéfalo",
            "você cometeu um erro de gramática, por tanto está errado o que tu disse",
            "é obvio que isso não é verdade, tu nunca foi na escola?",
            "isso é ofensivo d+, preciso te lembrar de não dizer esse tipo de coisa?",
            "lembrete para todos que você não deve escutar esse cara",
            "não sabe do que está falando",
            "eu sou professor de universidade, e acho isso ridículo",
            "eu e sua mãe conversamos ontem a noite na cama e estamos desapontados com o que você disse, seu pai e a namorada dele concordam também",
        ];
        const POSTS = [
            "PHP é bom",
            "PHP é ruim",
            "JS é bom",
            "JS é ruim",
            "GIT é chato demais",
            "GIT é bem fácil",
            "Quem não usa vim é analfabeto",
            "Não vale a pena aprender a usar vim",
            "Python é uma ferramenta ótima para certas tarefas e não para outras",
            "Exercício é fundamental para uma boa saúde",
            "Calistenia é para os fracos",
            "Calistenia é bem top",
            "Todo mundo aqui fica discordando de todo mundo!",
            "Oppenheimer é melhor que Barbie",
            "Barbie é melhor que Oppenheimer",
            "Imposto é roubo",
            "Todo problema do Brasil é por causa da falta do estado",
        ];
        let nome_index;
        do {
            nome_index = Math.floor(Math.random() * NOMES.length);
        } while (this._rede_social.consultarPerfil({nome: NOMES[nome_index]}) != null);
        let id = this._rede_social.gerarIdPerfil();
        let nome = NOMES[nome_index];
        let email = nome + "@random.com";
        let perfil = new Perfil(id, nome, email, null, []);
        this._rede_social.incluirPerfil(perfil);
        let num_postagens = 5 + Math.floor(Math.random() * 4);
        let todas_postagens = this._rede_social.consultarPostagem({visivel: true});
        for (let i = 0; i < num_postagens; i++) {
            let id = this._rede_social.gerarIdPostagem();
            let curtidas = 5 + Math.round((Math.random() - 0.5) * 8);
            let descurtidas = 5 + Math.round((Math.random() - 0.5) * 8);
            let texto, responde;
            if (todas_postagens.length != 0 && Math.random() > 0.5) {
                responde = todas_postagens[Math.floor(Math.random() * todas_postagens.length)].getId();
                texto = RESPOSTAS[Math.floor(Math.random() * RESPOSTAS.length)];
            } else {
                responde = null;
                texto = POSTS[Math.floor(Math.random() * POSTS.length)];
            }
            this._rede_social.incluirPostagem(new Postagem(id, texto, curtidas, descurtidas, perfil, responde))
        }
        console.clear();
        console.log("O perfil @" + nome + " foi criado")
    }

    escolherPerfil(): Perfil | null {
        while (true) {
            let busca = askStr("Perfil: ");
            if (busca.length === 0) {
                return null;
            }
            let id: number | undefined = Number(busca);
            if (!Number.isSafeInteger(id) || id <= 0) {
                id = undefined;
            }
            let perfil = this._rede_social.consultarPerfil({id, nome: busca, email: busca});
            if (perfil != null) {
                return perfil;
            }
            console.log("Perfil " + busca + " não encontrado");
        }
    }

    exigirSenha(auth: Auth): boolean | null {
        for (let i = 0; i < 3; i++) {
            let senha = askStr("senha: ");
            if (senha.length == 0) {
                return null;
            }
            if (auth.validar(senha)) {
                return true;
            }
            console.log("senha inválida");
        }
        return false;

    }
}

App.main();
