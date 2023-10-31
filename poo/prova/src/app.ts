import { RedeSocial } from "./rede_social";

class App {
    private _rede_social: RedeSocial;
    constructor() {
        this._rede_social = new RedeSocial();
    }

    executar() {
        console.log(JSON.stringify(this));
    }

    static main() {
        let app = new App;
        app.executar();
    }
}

App.main();
