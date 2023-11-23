#include <cstddef>

template <size_t MAX> struct Fila {
    int data[MAX] = {0};
    size_t len = 0;
    void entrar(int value) {
        if (len != MAX) data[len++] = value;
    }
    int sair() {
        int temp = data[0];
        len--;
        for (size_t i = 0; i < len; i++) {
            data[i] = data[i + 1];
        }
        return temp;
    }
    int primeiro() const {
        if (len != 0) return data[0];
        return -1;
    }
    int ultimo() const {
        if (len != 0) return data[len - 1];
        return -1;
    }
    bool filaCheia() const {
        return len == MAX;
    }
    bool filaVazia() const {
        return len == 0;
    }
};
