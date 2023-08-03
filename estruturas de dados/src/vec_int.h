#ifndef VEC_INT_H
#define VEC_INT_H

#include <stddef.h>

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
