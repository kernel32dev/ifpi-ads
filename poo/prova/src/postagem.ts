import { Perfil } from "./perfil";

export class Postagem {
    private _id: number;
    private _texto: string;
    private _curtidas: number;
    private _descurtidas: number;
    private _perfil: Perfil;

    constructor(
        id: number,
        texto: string,
        curtidas: number,
        descurtidas: number,
        perfil: Perfil,
    ) {
        this._id = id;
        this._texto = texto;
        this._curtidas = curtidas;
        this._descurtidas = descurtidas;
        this._perfil = perfil;
    }

    getId(): number { return this._id; }
    getTexto(): string { return this._texto; }
    getCurtidas(): number { return this._curtidas; }
    getDescurtidas(): number { return this._descurtidas; }
    getPerfil(): Perfil { return this._perfil; }

    curtir() {
        this._curtidas += 1;
    }
    descurtir() {
        this._descurtidas += 1;
    }
    ehPopular(): boolean {
        return this._curtidas / this._descurtidas > 1.5;
    }
}
