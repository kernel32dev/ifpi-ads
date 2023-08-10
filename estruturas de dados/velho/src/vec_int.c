#include "vec_int.h"

#include <string.h>
#include <stdlib.h>

static size_t min_size(size_t, size_t);

void vec_int_init(struct VecInt* vec) {
    vec->data = NULL;
    vec->size = 0;
}

void vec_int_term(struct VecInt* vec) {
    free(vec->data);
}

void vec_int_resize(struct VecInt* vec, size_t new_size) {
    if (new_size == 0) {
        free(vec->data);
        vec->data = NULL;
        vec->size = 0;
        return;
    }
    if (vec->data) {
        int* new_data = (int*)malloc(sizeof(int) * new_size);
        size_t ints_to_copy = min_size(vec->size, new_size);
        memcpy(new_data, vec->data, ints_to_copy);
        free(vec->data);
        vec->data = new_data;
        vec->size = new_size;
    } else {
        vec->data = (int*)malloc(sizeof(int) * new_size);
        vec->size = new_size;
    }
}

void vec_int_push(struct VecInt* vec, int value) {
    vec_int_resize(vec, vec->size + 1);
    vec->data[vec->size - 1] = value;
}

int vec_int_pop(struct VecInt* vec) {
    if (vec->size == 0) {
        return 0;
    }
    int last = vec->data[vec->size - 1];
    vec_int_resize(vec, vec->size - 1);
    return last;
}

static size_t min_size(size_t a, size_t b) {
    if (a < b) {
        return a;
    } else {
        return b;
    }
}
