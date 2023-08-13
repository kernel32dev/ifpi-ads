
#include <stdio.h>

char f1[10];
char f2[10];

static int custom_strcmp(const char* a, const char* b);

int main() {
    printf("Digite a primeira string:");
    scanf("%s", f1);
    printf("Digite a segunda string:");
    scanf("%s", f2);

    if (custom_strcmp(f1, f2)) {
        printf("São diferentes!!\n");
    } else {
        printf("São iguais!!\n");
    }
}

static int custom_strcmp(const char* a, const char* b) {
    for (;*a && *b; a++, b++) {
        if (*a != *b) {
            break;
        }
    }
    return *a - *b;
}
