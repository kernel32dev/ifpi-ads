#include "io_utils.h"
#include <stdio.h>

int scan_int(const char* message, int min, int max) {
    while (1) {
        int value = 0;
        printf("%s: ", message);
        scanf("%i", &value);
        if (value >= min && value <= max) {
            return value;
        }
    }
}

void pause(void) {
    printf("Aperte enter para continuar\n");
    getchar();
    getchar();
}

void clear_terminal(void) {
    // magica :D
    // dica: execute "clear | xxd" no terminal
    printf("\x1b[H\x1b[2J\x1b[3J");
}

