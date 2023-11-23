
#include <iostream>
#include "lista.hpp"

int soma(Lista lista);

int main() {
    Lista lista = nullptr;
    lista = new Nodo(lista, 4);
    lista = new Nodo(lista, 5);
    lista = new Nodo(lista, 1);
    lista = new Nodo(lista, 3);
    std::cout << soma(lista) << std::endl;
}

int soma(Lista lista) {
    if (!lista) return 0;
    return lista->data + soma(lista->next);
}
