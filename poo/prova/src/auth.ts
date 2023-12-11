import { createHash } from "crypto";
import { DeserializationError } from "./error";

export class Auth {
    private _hash: string;
    private _sal: string;

    constructor(hash: string, sal: string) {
        this._hash = hash;
        this._sal = sal;
    }

    static gerar(senha: string): Auth {
        let sal = Auth.gerarSalAleatorio();
        let hash = Auth.digerir(senha, sal);
        return new Auth(hash, sal)
    }

    validar(senha: string): boolean {
        return Auth.digerir(senha, this._sal) == this._hash;
    }

    private static gerarSalAleatorio(): string {
        return Math.floor(Math.random() * 0x10000).toString(16).padStart(4, '0').toUpperCase();
    }

    private static digerir(senha: string, sal: string): string {
        let hasher = createHash("sha256");
        // sha256 não é um bom algoritimo para obfuscar senhas
        // isso é apenas uma demonstração de hashing sendo usado para guardar senhas
        // o ideal seria bcrypt, mas isso adicionaria uma dependência a um compilador c
        hasher.update(senha);
        hasher.update(sal);
        hasher.update(senha);
        hasher.update(sal);
        return hasher.digest('hex');
    }

    serializarParaJson(): any {
        return {
            hash: this._hash,
            sal: this._sal,
        };
    }
    static deserializarDeJson(json: any): Auth {
        if (typeof json.hash !== "string" || json.hash.length == 0)
            throw new DeserializationError();

        if (typeof json.sal !== "string" || json.sal.length == 0)
            throw new DeserializationError();

        return new Auth(json.hash, json.sal);
    }
}
