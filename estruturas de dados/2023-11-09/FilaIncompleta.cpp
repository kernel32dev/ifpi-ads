#include <stdio.h>
#include <iostream>
#include <stdlib.h>
#include <string.h>

using namespace std;

class No{
	public:
		char nome;
		No *prox;
		No(char n){
			nome = n;
			prox = NULL;
		}
};

class Fila{
	public:
		No *inicio;
		No *fim;
		
		Fila(){
			inicio = NULL;
			fim = NULL;
		}
		
		void append(char n){
			
		}
		
		char pop(){
			
		}
		
		bool isEmpty(){
			return (inicio == NULL);
		}
	
	    public void popAll(){
	    	
	    	
		}

};

int main(){
	
	
    
	

	
}
