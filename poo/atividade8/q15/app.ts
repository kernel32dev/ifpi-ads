import prompt = require("prompt-sync")
import { Conta } from "./conta"
import { Banco } from "./banco"
import { InputInvalidoError } from "./erro"

let input = prompt()
let banco: Banco = new Banco()
let opcao: string = ''

do {
    console.log("\nBem-vindo, digite uma opcao: \n")
    console.log('1 - Cadastrar      2 - Consultar       3 - Sacar\n' +
                '4 - Depositar      5 - Excluir         6 - Transferir\n' +
                '7 - Render Juros   0 - Sair\n')

    // função atualizada para q14
    try {
        opcao = input("Opcao: ")

        switch (opcao) {
            case "1":
                inserir()
                break
            case "2":
                consultar()
                break
            case "3":
                sacar()
                break
            case "4":
                depositar()
                break
            case "5":
                excluir()
                break
            case "6":
                transferir()
                break
            case "7":
                renderJuros()
            default:
                throw new InputInvalidoError("Opcao invalida");
        }
    } catch (e) {
        if (e instanceof Error) {
            console.log("Ocorreu um erro! a operação não foi executada");
            console.log(e.message);
            input("Aperte enter para continuar...");
        } else {
            throw e;
        }
    }
    input("Operacao finalizada. Digite <enter>")
} while (opcao != "0")

console.log("Aplicacao encerrada")

function inserir(): void {
    console.log("\nCadastrar conta\n")
    let numero: string = inputNumeroConta()

    let conta: Conta
    conta = new Conta(numero, 0)
    banco.inserir(conta)
}

function consultar(): void {
    console.log("\nConsultar conta\n")
    let numero: string = inputNumeroConta()

    banco.consultar(numero)
}

function sacar(): void {
    console.log("\nSacar valor\n")
    let numero: string = inputNumeroConta()
    let valor: number = inputValor("Digite o valor de saque")

    banco.sacar(numero, valor)
}

function depositar(): void {
    console.log("\nDepositar valor\n")
    let numero: string = inputNumeroConta()
    let valor: number = inputValor("Digite o valor de deposito")

    banco.depositar(numero, valor)
}

function excluir(): void {
    console.log("\nExcluir conta\n")
    let numero: string = inputNumeroConta()

    banco.excluir(numero)
}

function transferir(): void {
    console.log("\nTransferir valor\n")
    let numeroDebito: string = inputNumeroConta("Digite o numero da conta de origem")
    let numeroCredito: string = inputNumeroConta("Digite o numero da conta de destino")
    let valor: number = inputValor("Digite o valor a ser transferido")

    banco.transferir(numeroCredito, numeroDebito, valor)
}

function renderJuros() {
    console.log("\nRender Juros\n")
    let numero: string = inputNumeroConta()

    banco.renderJuros(numero)
}

function inputNumeroConta(message = "Digite o numero da conta"): string {
    let numero: string = input(message + ": ").trim()
    if (numero.length === 0) throw new InputInvalidoError("número da conta não pode ser vazia");
    return numero;
}

function inputValor(message = "Digite o valor"): number {
    let numero: number = parseFloat(input(message + ": "))
    if (Number.isNaN(numero) || !Number.isFinite(numero) || numero < 0) {
        throw new InputInvalidoError("valor inválido");
    }
    return numero;
}
