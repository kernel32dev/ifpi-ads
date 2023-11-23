
#include <iostream>
#include "lista.hpp"
#include "utils.h"

Lista enesimo(size_t, Lista);

int main() {
    Lista lista = nullptr;
    lista = new Nodo(lista, 'd');
    lista = new Nodo(lista, 'c');
    lista = new Nodo(lista, 'b');
    lista = new Nodo(lista, 'a');
    assert(enesimo(0, lista) == nullptr);
    assert(enesimo(1, lista)->data == 'a');
    assert(enesimo(2, lista)->data == 'b');
    assert(enesimo(3, lista)->data == 'c');
    assert(enesimo(4, lista)->data == 'd');
    assert(enesimo(5, lista) == nullptr);
}

Lista enesimo(size_t n, Lista lista) {
    if (!lista || n == 1) return lista;
    return enesimo(n - 1, lista->next);
}
