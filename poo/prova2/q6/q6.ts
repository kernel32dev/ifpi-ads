abstract class Funcionario {
	abstract getBonificacao(): number;
}
class Gerente extends Funcionario {
	salario: number;
	constructor(salario: number) {
        super();
		this.salario = salario;
	}
	override getBonificacao(): number {
		return this.salario * 0.4;
	}
}
class Diretor extends Funcionario {
	salario: number;
	constructor(salario: number) {
        super();
		this.salario = salario;
	}
	override getBonificacao(): number {
		return this.salario * 0.6;
	}
}
class Presidente extends Funcionario {
	salario: number;
	constructor(salario: number) {
        super();
		this.salario = salario;
	}
	override getBonificacao(): number {
		return this.salario + 1000;
	}
}
