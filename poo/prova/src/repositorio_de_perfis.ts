import { Perfil } from "./perfil";

export class RepositorioDePerfis {
    private _perfis: Perfil[] = [];
    private _genId: number = 0;

    incluir(perfil: Perfil) {
        this._perfis.push(perfil);
    }
    consultar({id, nome, email}: {
        id?: number | null,
        nome?: string | null,
        email?: string | null,
    }): Perfil | null {
        for (let perfil of this._perfis) {
            if (
                (typeof id == "number" && perfil.getId() == id) ||
                (typeof nome == "string" && perfil.getNome() == nome) ||
                (typeof email == "string" && perfil.getEmail() == email)
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

        // TODO! mais checagens
        if (typeof json.postagens !== "object")
            throw new Error("Deserialization Error");

        let perfis: Perfil[] = json.postagens.map((x: any) => Perfil.deserializarDeJson(x));

        let repo = new RepositorioDePerfis();

        repo._genId = json.genId;
        repo._perfis = perfis;

        return repo;
    }
}
