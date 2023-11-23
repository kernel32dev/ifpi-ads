
#include <iostream>
#include "lista.hpp"
#include "utils.h"

bool igual(Lista, Lista);

int main() {
    Lista a = nullptr;
    a = new Nodo(a, 'o');
    a = new Nodo(a, 'b');
    a = new Nodo(a, 'o');
    a = new Nodo(a, 'b');
    Lista b = nullptr;
    b = new Nodo(b, 'o');
    b = new Nodo(b, 'b');
    b = new Nodo(b, 'o');
    b = new Nodo(b, 'c');
    assert(!igual(a, b));
    b->data = 'b';
    assert(igual(a, b));
}

bool igual(Lista a, Lista b) {
    if (a == b) return true;
    if (!a || !b) return false;
    if (a->data != b->data) return false;
    return igual(a->next, b->next);
}
