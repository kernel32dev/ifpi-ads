
#include "utils.h"
#include "pilha.hpp"

int main() {
    Pilha<4> pilha;
    assert(pilha.pilhaVazia());
    pilha.empilhar(1);
    pilha.empilhar(2);
    pilha.empilhar(3);
    pilha.empilhar(4);
    assert(pilha.pilhaCheia());
    assert(pilha.desempilhar() == 4);
    assert(pilha.desempilhar() == 3);
    assert(pilha.desempilhar() == 2);
    assert(pilha.desempilhar() == 1);
    assert(pilha.pilhaVazia());
    printf("testes da pilha estão ok\n");
}
