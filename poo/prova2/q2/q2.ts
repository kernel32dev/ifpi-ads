
abstract class ClasseAbstrata {
	abstract imprimaAlgo(): void ;
}
class ClasseConcreta extends ClasseAbstrata {
	imprimaAlgo() {
		console.log("Algo");
	}
}