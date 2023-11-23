
#include <iostream>

struct Nodo {
    Nodo* next;
    int data;
    Nodo(Nodo* next, int data) : next(next), data(data) {}
    ~Nodo() {
        if (next) delete next;
    }
    void print() const {
        std::cout << data;
        if (next) {
            std::cout << ',';
            next->print();
        } else {
            std::cout << std::endl;
        }
    }
};

typedef Nodo* Lista;
