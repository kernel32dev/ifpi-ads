import { DeserializationError, PerfilNaoEncontradoError } from "./error";
import { Perfil } from "./perfil";

export interface IRepositorioDePerfis {
    incluir(perfil: Perfil): void;
    listar(): Perfil[];
    consultar(filtros: {
        id?: number,
        nome?: string,
        email?: string,
    }): Perfil;
    gerarId(): number;
    serializarParaJson(): any;
    deserializarDeJson(json: any): void;
}

export class RepositorioDePerfisArray implements IRepositorioDePerfis {
    private _perfis: Perfil[] = [];
    private _genId: number = 0;

    incluir(perfil: Perfil): void {
        this._perfis.push(perfil);
    }
    listar(): Perfil[] {
        return this._perfis;
    }
    consultar({id, nome, email}: {
        id?: number,
        nome?: string,
        email?: string,
    }): Perfil {
        for (let perfil of this._perfis) {
            if (
                (id !== undefined && perfil.getId() == id) ||
                (nome !== undefined && perfil.getNome() == nome) ||
                (email !== undefined && perfil.getEmail() == email)
            ) return perfil;
        }
        throw new PerfilNaoEncontradoError();
    }
    gerarId(): number {
        return ++this._genId;
    }

    serializarParaJson(): any {
        return {
            perfis: this._perfis.map(x => x.serializarParaJson()),
            genId: this._genId,
        };
    }

    deserializarDeJson(json: any): void {
        if (typeof json.genId !== "number" || !Number.isSafeInteger(json.genId) || json.id < 0)
            throw new DeserializationError();

        if (typeof json.postagens !== "object" && json.postagens instanceof Array)
            throw new DeserializationError();

        let perfis: Perfil[] = json.postagens.map((x: any) => Perfil.deserializarDeJson(x));

        this._genId = json.genId;
        this._perfis = perfis;
    }
}

class PerfilNode {
    perfil: Perfil;
    next: PerfilNode | null;
    constructor(perfil: Perfil, next: PerfilNode | null) {
        this.perfil = perfil;
        this.next = next;
    }
    getPerfil(): Perfil {
        return this.perfil;
    }
    getNext(): PerfilNode | null {
        return this.next;
    }
    setNext(next: PerfilNode | null) {
        this.next = next;
    }
    intoArray(): Perfil[] {
        let arr = [];
        for (let i: PerfilNode | null = this; i; i = i.next) {
            arr.push(i.getPerfil());
        }
        return arr;
    }
    static fromArray(array: Perfil[]): PerfilNode | null {
        if (array.length === 0) {
            return null;
        } else {
            return new PerfilNode(array[0], PerfilNode.fromArray(array.slice(1)));
        }
    }
}

export class RepositorioDePerfisList implements IRepositorioDePerfis {
    private _perfis: PerfilNode | null = null;
    private _genId: number = 0;

    incluir(perfil: Perfil): void {
        this._perfis = new PerfilNode(perfil, this._perfis);
    }
    listar(): Perfil[] {
        if (this._perfis) {
            return this._perfis.intoArray();
        } else {
            return [];
        }
    }
    consultar({id, nome, email}: {
        id?: number,
        nome?: string,
        email?: string,
    }): Perfil {
        for (let node: PerfilNode | null = this._perfis; node; node = node.next) {
            let perfil = node.getPerfil();
            if (
                (id !== undefined && perfil.getId() == id) ||
                (nome !== undefined && perfil.getNome() == nome) ||
                (email !== undefined && perfil.getEmail() == email)
            ) return perfil;
        }
        throw new PerfilNaoEncontradoError();
    }
    gerarId(): number {
        return ++this._genId;
    }

    serializarParaJson(): any {
        let perfis = [];
        if (this._perfis) {
            perfis = this._perfis.intoArray().map(x => x.serializarParaJson());
        }
        return {
            perfis,
            genId: this._genId,
        };
    }

    deserializarDeJson(json: any): void {
        if (typeof json.genId !== "number" || !Number.isSafeInteger(json.genId) || json.id < 0)
            throw new DeserializationError();

        if (typeof json.perfis !== "object" && json.perfis instanceof Array)
            throw new DeserializationError();

        let perfis: Perfil[] = json.perfis.map((x: any) => Perfil.deserializarDeJson(x));

        this._genId = json.genId;
        this._perfis = PerfilNode.fromArray(perfis);
    }
}
