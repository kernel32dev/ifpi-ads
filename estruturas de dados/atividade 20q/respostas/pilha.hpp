#include <cstddef>

template <size_t MAX> struct Pilha {
    int data[MAX] = {0};
    size_t len = 0;
    void empilhar(int value) {
        if (len != MAX) data[len++] = value;
    }
    int desempilhar() {
        if (len != 0) return data[--len];
        return -1;
    }
    int topo() const {
        if (len != 0) return data[len - 1];
        return -1;
    }
    bool pilhaCheia() const {
        return len == MAX;
    }
    bool pilhaVazia() const {
        return len == 0;
    }
};
