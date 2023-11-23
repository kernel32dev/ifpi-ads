
#include <iostream>
#include "fila.hpp"
#include "utils.h"

void empilhar(Fila<1024>&, int);
int desempilhar(Fila<1024>&);
void inverter(Fila<1024>&);

int main() {
    Fila<1024> fila;
    empilhar(fila, 1);
    empilhar(fila, 2);
    empilhar(fila, 3);
    assert(desempilhar(fila) == 3);
    assert(desempilhar(fila) == 2);
    assert(desempilhar(fila) == 1);
}

void empilhar(Fila<1024>& fila, int item) {
    fila.entrar(item);
}

int desempilhar(Fila<1024>& fila) {
    if (fila.filaVazia()) return -1;
    inverter(fila);
    int temp = fila.sair();
    inverter(fila);
    return temp;
}

void inverter(Fila<1024>& fila) {
    if (fila.filaVazia()) return;
    int temp = fila.sair();
    inverter(fila);
    fila.entrar(temp);
}