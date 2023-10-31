import { Perfil } from "./perfil";

export class RepositorioDePerfis {
    private _perfis: Perfil[] = [];

    incluir(perfil: Perfil) {
        this._perfis.push(perfil);
    }
    consultar(
        id: number | null,
        nome?: string | null,
        email?: string | null,
    ): Perfil | null {
        for (let perfil of this._perfis) {
            if (id && perfil.getId() == id) return perfil;
            if (nome && perfil.getNome() == nome) return perfil;
            if (email && perfil.getEmail() == email) return perfil;
        }
        return null;
    }
}
