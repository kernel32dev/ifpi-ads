#include <stdio.h>
#include <iostream>
#include <stdlib.h>
#include <string.h>

#define assert(predicate) if (!(predicate)) { printf("assert falhou na linha %i\n", __LINE__); abort(); }

using namespace std;

class No{
	public:
		char nome;
		No *prox;
		No(char n){
			nome = n;
			prox = nullptr;
		}
};

class Fila{
	public:
		No *inicio;
		No *fim;
		
		Fila(){
			inicio = nullptr;
			fim = nullptr;
		}
		
		void append(char n){
			No* novo_inicio = new No(n);
			if (inicio) {
				inicio->prox = novo_inicio;
			} else {
				fim = novo_inicio;
			}
			inicio = novo_inicio;
		}
		
		char pop(){
			if (!fim) {
				puts("Fila::pop chamado em uma fila vazia");
				abort();
			}
			No* velho_fim = fim;
			fim = fim->prox;
			if (!fim) inicio = nullptr;
			char nome = velho_fim->nome;
			delete velho_fim;
			return nome;
		}
		
		bool isEmpty(){
			return (inicio == nullptr);
		}
	
	    void popAll(){
	    	while (inicio) pop();
		}

};

int main(){
	Fila fila = Fila();
	fila.append('A');
	assert(!fila.isEmpty());
	fila.append('B');
	fila.append('C');
	assert(!fila.isEmpty());
	assert(fila.pop() == 'A');
	assert(fila.pop() == 'B');
	assert(!fila.isEmpty());
	assert(fila.pop() == 'C');
	assert(fila.isEmpty());
	fila.append('A');
	assert(!fila.isEmpty());
	fila.append('B');
	fila.append('C');
	fila.popAll();
	assert(fila.isEmpty());
	fila.popAll();
	assert(fila.isEmpty());

    return 0;
}
