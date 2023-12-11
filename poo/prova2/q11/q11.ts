interface Tributavel {
	calculaTributos(): number;
}
class Conta {
	nome: string;
	saldo: number;
	constructor(nome: string, saldo: number) {
		this.nome = nome;
		this.saldo = saldo;
	}
	getNome(): string { return this.nome; }
	setNome(v: string): void { this.nome = v; }
	getSaldo(): number { return this.saldo; }
	setSaldo(v: number): void { this.saldo = v; }
}
class ContaCorrente extends Conta implements Tributavel {
	constructor(nome: string, saldo: number) {
		super(nome, saldo);
	}
	calculaTributos(): number {
		return this.saldo * 0.1;
	}
}
class SeguroDeVida implements Tributavel {
	calculaTributos(): number {
		return 50;
	}
}
class AuditoriaInterna {
    contas: Tributavel[] = [];
    adicionar(conta: Tributavel) {
        this.contas.push(conta);
    }
    calcularTributos(): number {
        return this.contas.reduce((acc, conta) => acc + conta.calculaTributos(), 0);
    }
}
class TestarAuditoriaInterna {
    testar() {
        let auditoria = new AuditoriaInterna();
        auditoria.adicionar(new ContaCorrente("123", 50));
        auditoria.adicionar(new SeguroDeVida());
        if (auditoria.calcularTributos() == 55) {
            console.log("testes passaram");
        } else {
            console.log("AuditoriaInterna.calcularTributos não retornou o esperado");
        }
    }
}

new TestarAuditoriaInterna().testar();
