import { SaldoInsuficienteError, ValorInvalidoError } from "./erro";

export class Conta {
    private _numero: string
    private _saldo: number

    // função atualizada para q6
    // função atualizada para q11
    constructor(numero: string, saldo: number) {
        Conta.validarValor(saldo);
        this._numero = numero
        this._saldo = saldo
    }

    get numero(): string {
        return this._numero
    }

    get saldo(): number {
        return this._saldo
    }

    // função atualizada para q3
    // função atualizada para q11
    public sacar(valor: number): void {
        Conta.validarValor(valor);
        if (this.saldo < valor) {
            throw new SaldoInsuficienteError(`não é possível sacar ${valor} de ${this.saldo}`);
        }
        this._saldo -= valor
    }

    // função atualizada para q11
    public depositar(valor: number): void {
        Conta.validarValor(valor);
        this._saldo += valor
    }

    public consultar(): number {
        return this.saldo
    }

    // função atualizada para q3
    public transferir(contaDest: Conta, valor: number): void {
        this.sacar(valor);
        contaDest.depositar(valor);
    }

    // função atualizada para q11
    private static validarValor(valor: number): void {
        if (valor < 0) {
            throw new ValorInvalidoError(`não é possível informar um valor negativo aqui`);
        }
    }
}

export class Poupanca extends Conta {
    private _taxaJuros: number

    constructor(numero: string, saldo: number, taxaJuros: number) {
        super(numero, saldo)
        this._taxaJuros = taxaJuros
    }

    public renderJuros(): void {
        this.depositar(this.saldo * (this._taxaJuros / 100))
    }

    get taxaJuros(): number {
        return this._taxaJuros
    }
}

export class ContaImposto extends Conta {
    private _taxaDesconto: number

    constructor(numero: string, saldo: number, taxaDesconto: number) {
        super(numero, saldo)
        this._taxaDesconto = taxaDesconto
    }

    public debitar(valor: number): void {
        let total = valor + valor * (this._taxaDesconto / 100)
        super.sacar(total)
    }
}

// let conta: Conta = new Conta("111", 456)
// let conta2: Conta = new Conta("222", 300)
// conta.transferir(conta2, 200)

// let conta: Conta
// conta = new Poupanca("2", 100, 0.05)
// conta.depositar(100)
// let poupanca: Poupanca = <Poupanca> conta 
// poupanca.renderJuros()

// // sem uso de cast

// let contaP: Poupanca = new Poupanca("5", 200, 0.04)
// contaP.depositar(100)
// contaP.renderJuros()
