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
