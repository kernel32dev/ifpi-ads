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

class Pilha{
	public:
		No *topo;
		
		Pilha(){
			topo = nullptr;
		}
		
		void push(char n){
			No* new_topo = new No(n);
			new_topo->prox = topo;
			topo = new_topo;
		}
		
		char pop(){
			if (!topo) {
				puts("Fila::pop chamado em uma fila vazia");
				abort();
			}
			char nome = topo->nome;
			No* new_topo = topo->prox;
			delete topo;
			topo = new_topo;
			return nome;
		}
		
		int isEmpty(){
			return !topo;
		}
		
		void desempilha(){
			while (topo) pop();
		}
	
	
};

int main(){
	Pilha pilha = Pilha();
	pilha.push('A');
	assert(!pilha.isEmpty());
	pilha.push('B');
	pilha.push('C');
	assert(!pilha.isEmpty());
	assert(pilha.pop() == 'C');
	assert(pilha.pop() == 'B');
	assert(!pilha.isEmpty());
	assert(pilha.pop() == 'A');
	assert(pilha.isEmpty());
	pilha.push('A');
	assert(!pilha.isEmpty());
	pilha.push('B');
	pilha.push('C');
	pilha.desempilha();
	assert(pilha.isEmpty());
	pilha.desempilha();
	assert(pilha.isEmpty());

	return 0;
}
