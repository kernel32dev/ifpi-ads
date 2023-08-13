
#include <stdio.h>

char frase[20] = {"Uma frase"};

int main() {
    for (size_t i = 0; frase[i] != 0; i++) {
        printf("[%llu]: %c\n", i, frase[i]);
    }
}
