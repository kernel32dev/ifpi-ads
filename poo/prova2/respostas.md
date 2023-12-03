
# Respostas prova
*Germano Barbosa da Silva Júnior - 2023-12-07*

> #### 1. Podemos instanciar classes abstratas? Justifique.

não pois tem metodos não implementados, o que aconteceria se ele fosse criado em uma instância abstrata?

> #### 2. Explique o que é necessário para que a compilação da ClasseConcreta ocorra sem erros:
> ```ts
> abstract class ClasseAbstrata {
>  abstract imprimaAlgo(): void ;
> }
> class ClasseConcreta extends ClasseAbstrata {
> }
> ```

falta implementar a função imprimaAlgo:
```ts
class ClasseConcreta extends ClasseAbstrata {
	imprimaAlgo() {
		console.log("Algo");
	}
}
```

> #### 3. Se uma classe que herda de uma abstrata e não implementa os seus métodos, o que ocorre?

ela continua a ser abstrata

> #### 4. Imagine que você deve modelar várias figuras geométricas em TypeScript e que cada uma tem sua específica de calcular área e perímetro. Proponha e implemente uma hierarquia de classes usando uma classe abstrata chamada FiguraGeometrica e outras concretas: Quadrado, Triangulo, etc.
```ts
class Quadrado extends FiguraGeometrica {
	lado: number;
	constructor(lado: number) {
		this.lado = lado;
	}
	calcularArea(): number {
		return lado * lado;
	}
}
class Triangulo extends FiguraGeometrica {
	lado_a: number;
	lado_b: number;
	constructor(lado_a: number, lado_b: number) {
		this.lado_a = lado_a;
		this.lado_b = lado_b;
	}
	calcularArea(): number {
		return lado_a * lado_b * 0.5;
	}
}
class Retangulo extends FiguraGeometrica {
	lado_a: number;
	lado_b: number;
	constructor(lado_a: number, lado_b: number) {
		this.lado_a = lado_a;
		this.lado_b = lado_b;
	}
	calcularArea(): number {
		return lado_a * lado_b;
	}
}
class Circulo extends FiguraGeometrica {
	raio: number;
	constructor(raio: number) {
		this.raio = raio;
	}
	calcularArea(): number {
		return raio * raio * Math.PI;
	}
}
```

> #### 5. Não podemos aplicar o operador new em FiguraGeometrica, mas porque então podemos > realizar o seguinte código de instanciação:
> ```ts
> abstract class FiguraGeometrica {
> //...
> }
> let figuras: FiguraGeometrica[] = new Array();
> ```

pois estamos declarando um array de coisas que herdam de `FiguraGeometrica`, e não um array de instâncias de `FiguraGeometrica`

> #### 6. Implemente as classes Funcionario, Gerente e Diretor conforme o diagrama exposto em sala:
>
> a. A classe funcionário deve ser abstrata e o método getBonificacao() abstrato;
>
> b. Na classe gerente o método bonificação deve retornar 40% do salário;
>
> c. Em Diretor a bonificação deve ser 60% do salário.
>
> d. Por fim, na classe presidente o método deve retornar 100% do salário + R$ 1.000,00.

```ts
abstract class Funcionario {
	abstract getBonificacao(): number;
}
class Gerente : Funcionario {
	salario: number;
	constructor(salario: number) {
		this.salario = salario;
	}
	override getBonificacao(): number {
		return salario * 0.4;
	}
}
class Diretor : Funcionario {
	salario: number;
	constructor(salario: number) {
		this.salario = salario;
	}
	override getBonificacao(): number {
		return salario * 0.6;
	}
}
class Presidente : Funcionario {
	salario: number;
	constructor(salario: number) {
		this.salario = salario;
	}
	override getBonificacao(): number {
		return salario + 1000;
	}
}
```

> #### 7. Refaça a questão 04 do exercício usando interfaces com os métodos propostos em vez de herança. Crie também um script que instancie e teste diferentes formas geométricas.

```ts
abstract class FiguraGeometrica {
	abstract calcularArea(): number;
}
class Quadrado extends FiguraGeometrica {
	lado: number;
	constructor(lado: number) {
		this.lado = lado;
	}
	override calcularArea(): number {
		return lado * lado;
	}
}
class Triangulo extends FiguraGeometrica {
	lado_a: number;
	lado_b: number;
	constructor(lado_a: number, lado_b: number) {
		this.lado_a = lado_a;
		this.lado_b = lado_b;
	}
	override calcularArea(): number {
		return lado_a * lado_b * 0.5;
	}
}
class Retangulo extends FiguraGeometrica {
	lado_a: number;
	lado_b: number;
	constructor(lado_a: number, lado_b: number) {
		this.lado_a = lado_a;
		this.lado_b = lado_b;
	}
	override calcularArea(): number {
		return lado_a * lado_b;
	}
}
class Circulo extends FiguraGeometrica {
	raio: number;
	constructor(raio: number) {
		this.raio = raio;
	}
	override calcularArea(): number {
		return raio * raio * Math.PI;
	}
}
```

> #### 8. Crie uma interface chamada IComparavel com um método chamado comparar que receba uma forma geométrica como parâmetro e retorna um inteiro como resultado. Implemente em cada uma das classes do exemplo anterior a interface retornando -1, 0 e 1 caso a área da forma seja menor, igual ou maior que a passada via parâmetro.


```ts
abstract class FiguraGeometrica {
	abstract calcularArea(): number;
}
interface IComparavel {
	comparar(forma: FiguraGeometrica): number;
}
class Quadrado extends FiguraGeometrica implements IComparavel {
	lado: number;
	constructor(lado: number) {
		this.lado = lado;
	}
	override calcularArea(): number {
		return lado * lado;
	}
	comparar(forma: FiguraGeometrica): number {
		return Math.sign(this.calcularArea() - forma.calcularArea());
	}
}
class Triangulo extends FiguraGeometrica implements IComparavel {
	lado_a: number;
	lado_b: number;
	constructor(lado_a: number, lado_b: number) {
		this.lado_a = lado_a;
		this.lado_b = lado_b;
	}
	override calcularArea(): number {
		return lado_a * lado_b * 0.5;
	}
	comparar(forma: FiguraGeometrica): number {
		return Math.sign(this.calcularArea() - forma.calcularArea());
	}
}
class Retangulo extends FiguraGeometrica implements IComparavel {
	lado_a: number;
	lado_b: number;
	constructor(lado_a: number, lado_b: number) {
		this.lado_a = lado_a;
		this.lado_b = lado_b;
	}
	override calcularArea(): number {
		return lado_a * lado_b;
	}
	comparar(forma: FiguraGeometrica): number {
		return Math.sign(this.calcularArea() - forma.calcularArea());
	}
}
class Circulo extends FiguraGeometrica implements IComparavel {
	raio: number;
	constructor(raio: number) {
		this.raio = raio;
	}
	override calcularArea(): number {
		return raio * raio * Math.PI;
	}
	comparar(forma: FiguraGeometrica): number {
		return Math.sign(this.calcularArea() - forma.calcularArea());
	}
}
```

> #### 9. Crie uma classe para testar os exemplos anteriores. Instancie várias formas diferentes. Pegue duas formas chame em uma delas o método comparar passando a outra como parâmetro e exiba o resultado. Repita para outras formas. 

```ts
class TestadorFiguraGeometrica {
	testar(): void {
		// TODO!
	}
}
```

> #### 10. Implemente o diagrama de classes abaixo:

TODO!

> #### 11. Crie uma classe chamada AuditoriaInterna que tenha dois métodos que tenha um array de Tributaveis e os métodos:
>
> a. adicionar(Tributável);
>
> b. calcularTributos(): retorna um double que representa a soma de todos os cálculos dos tributos todos os tributáveis;
>
> c. Crie uma classe de testes que instancie várias classes ContaCorrente e SeguroDeVida, adicione-as na classe AuditoriaInterna e exiba o resultado do método calculaTributos. Perceba que a classe de auditoria não se preocupa que tipo de classe está sendo passada.

TODO!

> #### 12. Altere a aplicação feita sobre redes sociais para:
> a. Tratar erros e capturar exceções;
> b. Utilizar um mecanismo de persistência independente:
> i. Ter interfaces chamadas IRepositorioPerfis e IRepositorioPostagens com métodos de consulta e  relacionada à persistência de dados;
> ii. Usar um mecanismo de persistência alternativo que implemente as interfaces. Sugestão: banco de dados SQL;
> iii. Na hora de inicializar o App, você deve escolher o mecanismo de persistência e instanciar as implementações das interfaces (array, banco de dados, arquivo);
> iv. A classe rede social deve ter, em vez de repositórios comuns, interfaces e funcionar sem alterações independente da implementação.

TODO!
