
#include <limits.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include "io_utils.h"
#include "vec_int.h"

// o #include literalmente copia o código em outro arquivo e cola neste arquivo
// arquivos ".h" não são compilados, são incluidos em arquivos ".c" e apenas estes são compilados

// declaramos a função exemplo_vetores
// para dizer ao compilador que vamos definir ela depois
static void exemplo_vetores(void);

// a função main, aqui é onde o programa começa
int main(int argc, char *argv[]) {
    // um loop infinito, sai apenas quando encontra break
    while (1) {
        // essa função é declarada no arquivo io_utils.h, que foi incluido na linha 6
        // é assim que podemos chamar essa função
        clear_terminal();
        // printf é declarada no arquivo stdio.h que foi incluido na linha 4
        // esse é um arquivo da linguagem c
        printf(
            "1: exemplo de vetores\n"
            "0: sair\n"
        );
        // scan_int foi declarado em stdio.h
        int numero = scan_int("MENU", 0, 1);
        // se numero for 0, sai do loop
        if (numero == 0)
            break;
        switch (numero)
        {
        case 1:
            // aqui nós usamos a função, se não tivessemos declarado ela acima
            // o compilador não saberia que ela existe
            // (o compilador não consegue ver funções que ele ainda não compilou,
            // ele lê o código fonte de cima para baixo)
            exemplo_vetores();
            // esse break, não sai do while, sai do switch
            // vai entender
            break;
        }
    }
}

// essa função não é necessária fora desse arquivo, portanto declaramos ela com static
static void exemplo_vetores(void) {

    // aqui declaramos uma instância de um struct
    // o struct foi declarado na função vec_int.h
    struct VecInt vector;

    // todas as funções que começam com vec_int foram declarado na função vec_int.h
    vec_int_init(&vector);

    while (1) {
        clear_terminal();
        printf(
            "1: listar o vetor\n"
            "2: adicionar um item ao fim do vetor\n"
            "3: extrair um item do fim do vetor\n"
            "4: preencher o vetor com numeros aleatórios\n"
            "5: printar menor valor\n"
            "6: printar maior valor\n"
            "7: editar valor em posição\n"
            "0: voltar ao menu\n"
        );
        int numero = scan_int("MENU", 0, 7);
        if (numero == 0)
            break;
        switch (numero)
        {
        case 1: // listar
            for (size_t i = 0; i < vector.size; i++) {
                printf("[%lu]: %i\n", i, vector.data[i]);
            }
            if (vector.data) {
                printf("vector.data = %p\n", vector.data);
            } else {
                printf("vector.data = NULL\n");
            }
            printf("vector.size = %lu\n", vector.size);
            break;
        case 2: // push
            {
                // as constantes INT_MIN e INT_MAX foram declaradas no arquivo limits.h
                int valor = scan_int("Valor: ", INT_MIN, INT_MAX);
                vec_int_push(&vector, valor);
                printf("O valor %i foi adicionado ao fim\n", valor);
            }
            break;
        case 3: // pop
            if (vector.size) {
                int valor = vec_int_pop(&vector);
                printf("Foi extraido o valor %i\n", valor);
            } else {
                printf("O vetor está vazio\n");
            }
            break;
        case 4: // rand
            vec_int_resize(&vector, 10);
            for (size_t i = 0; i < vector.size; i++) {
                vector.data[i] = rand() % 1000;
            }
            printf("O vetor foi preenchido com 10 números\n");
            break;
        case 5: // min
            if (vector.size) {
                int menor = INT_MAX;
                for (size_t i = 0; i < vector.size; i++) {
                    if (menor > vector.data[i]) {
                        menor = vector.data[i];
                    }
                }
                printf("O menor valor é %i\n", menor);
            } else {
                printf("O vetor está vazio\n");
            }
            break;
        case 6: // max
            if (vector.size) {
                int maior = INT_MIN;
                for (size_t i = 0; i < vector.size; i++) {
                    if (maior < vector.data[i]) {
                        maior = vector.data[i];
                    }
                }
                printf("O maior valor é %i\n", maior);
            } else {
                printf("O vetor está vazio\n");
            }
            break;
        case 7: // edit
            if (vector.size) {
                printf("escolha um index entre 0 e %lu\n", vector.size - 1);
                int index = scan_int("Index", 0, (int)vector.size);
                int valor = scan_int("Valor", INT_MIN, INT_MAX);
                vector.data[index] = valor;
            } else {
                printf("O vetor está vazio\n");
            }
            break;
        }
        pause();
    }

    vec_int_term(&vector);
}
