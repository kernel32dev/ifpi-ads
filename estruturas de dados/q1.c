
#include <stdio.h>

char frase[20];

static size_t custom_strlen(const char* text);

int main() {
    printf("Digite o valor:");
    scanf("%s", frase);

    size_t tamanho = custom_strlen(frase);

    printf("O valor tem %zu bytes\n", tamanho);
}

static size_t custom_strlen(const char* text) {
    const char* end = text;
    while (*end) end++;
    return end - text;
}
