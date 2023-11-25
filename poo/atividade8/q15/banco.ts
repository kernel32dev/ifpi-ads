import { Conta, Poupanca } from "./conta";
import { ContaCodigoRepetidoError, ContaInexistenteError, PoupancaInvalidaError } from "./erro";

export class Banco {
    private _contas: Conta[] = []

    get contas(): Conta[] {
        return this._contas
    }

    // função atualizada para q13
    public inserir(conta: Conta): void {
        try {
            this.consultar(conta.numero);
        } catch (e) {
            if (e instanceof ContaInexistenteError) {
                this.contas.push(conta);
            } else {
                throw e;
            }
        }
        throw new ContaCodigoRepetidoError(`conta de numero ${conta} existe`);
    } 

    // função atualizada para q8
    public consultar(numero: string): Conta {
        let contaProcurada: Conta | null = null;
        for (let c of this.contas) {
            if (c.numero == numero) {
                contaProcurada = c
                break
            }
        }
        if (contaProcurada === null) {
            throw new ContaInexistenteError(`conta de numero ${numero} não existe`);
        }
        return contaProcurada
    }

    // função atualizada para q8
    private consultarIndice(numero: string): number {
        let indiceProcurado: number = -1
        for (let i: number = 0; i < this.contas.length; i++) {
            if (this.contas[i]. numero == numero) {
                indiceProcurado = i
                break
            }
        }
        if (indiceProcurado === -1) {
            throw new ContaInexistenteError(`conta de numero ${numero} não existe`);
        }
        return indiceProcurado
    }

    // função atualizada para q9
    public alterar(conta: Conta): void {
        let indice = this.consultarIndice(conta.numero)
        this.contas[indice] = conta
    }

    // função atualizada para q9
    public excluir(numero: string): void {
        let indice: number = this.consultarIndice(numero)
        this.contas.splice(indice, 1);
    }

    // metodos de conta

    // função atualizada para q9
    public depositar(numero: string, valor: number): void {
        let conta: Conta = this.consultar(numero)
        conta.depositar(valor)
    }

    // função atualizada para q9
    public sacar(numero: string, valor: number): void {
        let conta: Conta = this.consultar(numero)
        conta.sacar(valor)
    }

    // função atualizada para q9
    public transferir(numCredito: string, numDebito: string, valor: number): void {
        let cDebito: Conta = this.consultar(numDebito)
        let cCredito: Conta = this.consultar(numCredito)
        cDebito.transferir(cCredito, valor)
    }

    public totalContas(): number {
        let total: number = 0
        for (let conta of this.contas) {
            total++
        }
        return total
    }

    public totalSaldo(): number {
        let total: number = 0
        for (let conta of this.contas) {
            total += conta.saldo
        }
        return total
    }

    public mediaSaldo(): number {
        let totalContas = this.totalContas()
        let totalSaldo = this.totalSaldo()

        return totalSaldo / totalContas
    }

    public renderJuros(numero: string): void {
        let conta: Conta = this.consultar(numero)
        if (!(conta instanceof Poupanca)) {
            throw new PoupancaInvalidaError(`a conta ${numero} não é uma poupança`);
        }
        conta.renderJuros()
    }
}

// let banco: Banco = new Banco()
// banco.inserir(new Conta("1", 200))
// banco.inserir(new Conta("2", 300))
// console.log(banco.consultar("2").saldo)
// banco.excluir("1")
// banco.inserir(new Conta("1", 400))
// banco.depositar("1", 100)
// console.log(banco.consultar("1").saldo)
