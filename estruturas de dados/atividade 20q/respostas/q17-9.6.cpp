
#include <iostream>
#include "lista.hpp"

void substitui(int from, int to, Lista lista);

int main() {
    Lista lista = nullptr;
    lista = new Nodo(lista, 'o');
    lista = new Nodo(lista, 'b');
    lista = new Nodo(lista, 'o');
    lista = new Nodo(lista, 'b');
    substitui('o', 'a', lista);
    lista->print();
}

void substitui(int from, int to, Lista lista) {
    if (!lista) return;
    if (lista->data == from) lista->data = to;
    substitui(from, to, lista->next);
}
