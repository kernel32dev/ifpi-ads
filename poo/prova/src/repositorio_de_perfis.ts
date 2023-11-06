import { Perfil } from "./perfil";

export class RepositorioDePerfis {
    private _perfis: Perfil[] = [];
    private _genId: number = 0;

    incluir(perfil: Perfil) {
        this._perfis.push(perfil);
    }
    listar(): Perfil[] {
        return this._perfis;
    }
    consultar({id, nome, email}: {
        id?: number,
        nome?: string,
        email?: string,
    }): Perfil | null {
        for (let perfil of this._perfis) {
            if (
                (id !== undefined && perfil.getId() == id) ||
                (nome !== undefined && perfil.getNome() == nome) ||
                (email !== undefined && perfil.getEmail() == email)
            ) return perfil;
        }
        return null;
    }
    gerarId(): number {
        return ++this._genId;
    }

    serializarParaJson(): any {
        return {
            postagens: this._perfis.map(x => x.serializarParaJson()),
            genId: this._genId,
        };
    }

    static deserializarDeJson(json: any): RepositorioDePerfis {
        if (typeof json.genId !== "number" || !Number.isSafeInteger(json.genId) || json.id < 0)
            throw new Error("Deserialization Error");

        if (typeof json.postagens !== "object" && json.postagens instanceof Array)
            throw new Error("Deserialization Error");

        let perfis: Perfil[] = json.postagens.map((x: any) => Perfil.deserializarDeJson(x));

        let repo = new RepositorioDePerfis();

        repo._genId = json.genId;
        repo._perfis = perfis;

        return repo;
    }
}
