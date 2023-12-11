
abstract class FiguraGeometrica {
	abstract calcularArea(): number;
}
class Quadrado extends FiguraGeometrica {
	lado: number;
	constructor(lado: number) {
        super();
		this.lado = lado;
	}
	calcularArea(): number {
		return this.lado * this.lado;
	}
}
class Triangulo extends FiguraGeometrica {
	lado_a: number;
	lado_b: number;
	constructor(lado_a: number, lado_b: number) {
        super();
		this.lado_a = lado_a;
		this.lado_b = lado_b;
	}
	calcularArea(): number {
		return this.lado_a * this.lado_b * 0.5;
	}
}
class Retangulo extends FiguraGeometrica {
	lado_a: number;
	lado_b: number;
	constructor(lado_a: number, lado_b: number) {
        super();
		this.lado_a = lado_a;
		this.lado_b = lado_b;
	}
	calcularArea(): number {
		return this.lado_a * this.lado_b;
	}
}
class Circulo extends FiguraGeometrica {
	raio: number;
	constructor(raio: number) {
        super();
		this.raio = raio;
	}
	calcularArea(): number {
		return this.raio * this.raio * Math.PI;
	}
}
