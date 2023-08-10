#ifndef IO_UTILS_H
#define IO_UTILS_H

// as funções e structs que são usados em vários arquivos são definidos
// em arquivos ".h", e o arquivo ".h" é então incluido onde for necessário

// as três linhas abaixo são declarações, não a definições,
// a definição destas funções se encontram no arquivo io_utils.c

int scan_int(const char* message, int min, int max);

void pause(void);

void clear_terminal(void);

#endif /* IO_UTILS_H */