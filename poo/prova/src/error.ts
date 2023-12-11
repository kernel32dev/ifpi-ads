
export class AppError extends Error {}

export class DeserializationError extends AppError {
    constructor() {
        super("erro na deserialização do json");
    }
}

export class IdEmUsoError extends AppError {
    constructor(msg: string | undefined = "Esse id já está sendo usado") {
        super(msg)
    }
}

export class PostagemNaoEncontradaError extends AppError {
    constructor() {
        super("Essa postagem não existe")
    }
}

export class PerfilNaoEncontradoError extends AppError {
    constructor() {
        super("Esse perfil não existe")
    }
}
