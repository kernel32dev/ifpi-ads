
bin/estruturas_de_dados: bin/main.o bin/io_utils.o bin/vec_int.o
	mkdir -p bin
	gcc $^ -o $@

bin/%.o: src/%.c
	mkdir -p bin
	gcc $< -c -o $@ -g

bin/main.o: src/main.c src/io_utils.h src/vec_int.h
bin/io_utils.o: src/io_utils.c
bin/vec_int.o: src/vec_int.c
