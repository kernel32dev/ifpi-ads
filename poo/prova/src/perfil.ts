import { Postagem } from "./postagem";
import { Auth } from "./auth";

export class Perfil {
    private _id: number;
    private _nome: string;
    private _email: string;
    private _auth: Auth | null;
    private _postagens: Postagem[];

    constructor(id: number, nome: string, email: string, auth: Auth | null, postagens: Postagem[]) {
        this._id = id;
        this._nome = nome;
        this._email = email;
        this._auth = auth;
        this._postagens = postagens;
    }

    getId(): number { return this._id; }
    getNome(): string { return this._nome; }
    getEmail(): string { return this._email; }
    getAuth(): Auth | null { return this._auth; }
    getPostagens(): Postagem[] { return this._postagens; }

    pushPostagem(postagem: Postagem) {
        this._postagens.push(postagem);
    }

    serializarParaJson(): any {
        return {
            id: this._id,
            nome: this._nome,
            email: this._email,
            auth: this._auth === null ? null : this._auth.serializarParaJson()
        };
    }
    static deserializarDeJson(json: any): Perfil {
        if (typeof json.id !== "number" || !Number.isSafeInteger(json.id) || json.id <= 0)
            throw new Error("Deserialization Error");

        if (typeof json.nome !== "string" || json.nome.length == 0)
            throw new Error("Deserialization Error");

        if (typeof json.email !== "string" || json.email.length == 0)
            throw new Error("Deserialization Error");

        let auth = null;

        if (json.auth !== null) {
            if (typeof json.auth !== "object")
                throw new Error("Deserialization Error");

            auth = Auth.deserializarDeJson(json.auth);
        }

        return new Perfil(
            json.id, json.nome, json.email, auth, []
        );
    }
}
