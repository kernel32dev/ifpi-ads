#ifndef VEC_INT_H
#define VEC_INT_H

// as funções e structs que são usados em vários arquivos são definidos
// em arquivos ".h", e o arquivo ".h" é então incluido onde for necessário

// as três linhas abaixo são declarações, não a definições,
// a definição destas funções se encontram no arquivo io_utils.c

// arquivos ".h" costumam também incluir outros arquivos ".h"

// as declarações de "stddef.h" estarão visiveis nos arquivos que incluirem este arquivo
// nesse caso isso é necessário para garantir que o tipo "size_t" esteja definido

// size_t é um número sem sinal apropiado para guardar tamanhos

#include <stddef.h>

// structs não tem definições, apenas declarações
// isso acontece porque structs não tem código a ser definido
// é por isso que você não vai encontrar essa struct no vec_int.c

struct VecInt {
    int* data;
    size_t size;
};

void vec_int_init(struct VecInt*);

void vec_int_term(struct VecInt*);

void vec_int_resize(struct VecInt*, size_t new_size);

void vec_int_push(struct VecInt*, int value);

int vec_int_pop(struct VecInt*);

#endif /* VEC_INT_H */
