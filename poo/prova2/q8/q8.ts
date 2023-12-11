abstract class FiguraGeometrica {
	abstract calcularArea(): number;
}
interface IComparavel {
	comparar(forma: FiguraGeometrica): number;
}
class Quadrado extends FiguraGeometrica implements IComparavel {
	lado: number;
	constructor(lado: number) {
		super();
		this.lado = lado;
	}
	override calcularArea(): number {
		return this.lado * this.lado;
	}
	comparar(forma: FiguraGeometrica): number {
		return Math.sign(this.calcularArea() - forma.calcularArea());
	}
}
class Triangulo extends FiguraGeometrica implements IComparavel {
	lado_a: number;
	lado_b: number;
	constructor(lado_a: number, lado_b: number) {
		super();
		this.lado_a = lado_a;
		this.lado_b = lado_b;
	}
	override calcularArea(): number {
		return this.lado_a * this.lado_b * 0.5;
	}
	comparar(forma: FiguraGeometrica): number {
		return Math.sign(this.calcularArea() - forma.calcularArea());
	}
}
class Retangulo extends FiguraGeometrica implements IComparavel {
	lado_a: number;
	lado_b: number;
	constructor(lado_a: number, lado_b: number) {
		super();
		this.lado_a = lado_a;
		this.lado_b = lado_b;
	}
	override calcularArea(): number {
		return this.lado_a * this.lado_b;
	}
	comparar(forma: FiguraGeometrica): number {
		return Math.sign(this.calcularArea() - forma.calcularArea());
	}
}
class Circulo extends FiguraGeometrica implements IComparavel {
	raio: number;
	constructor(raio: number) {
		super();
		this.raio = raio;
	}
	override calcularArea(): number {
		return this.raio * this.raio * Math.PI;
	}
	comparar(forma: FiguraGeometrica): number {
		return Math.sign(this.calcularArea() - forma.calcularArea());
	}
}