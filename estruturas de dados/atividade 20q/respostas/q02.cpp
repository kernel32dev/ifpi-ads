
#include <iostream>
#include "pilha.hpp"
#include "utils.h"

void entrar(Pilha<1024>&, int);
int sair(Pilha<1024>&);

int main() {
    Pilha<1024> pilha;
    entrar(pilha, 1);
    entrar(pilha, 2);
    entrar(pilha, 3);
    assert(sair(pilha) == 1);
    assert(sair(pilha) == 2);
    assert(sair(pilha) == 3);
}

void entrar(Pilha<1024>& pilha, int item) {
    pilha.empilhar(item);
}

int sair(Pilha<1024>& pilha) {
    if (pilha.pilhaVazia()) return -1;
    int ultimo = pilha.desempilhar();
    if (pilha.pilhaVazia()) return ultimo;
    int primeiro = sair(pilha);
    pilha.empilhar(ultimo);
    return primeiro;
}