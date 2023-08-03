
bin/estruturas_de_dados: bin/main.o
	mkdir -p bin
	gcc $^ -o $@

bin/%.o: src/%.c
	mkdir -p bin
	gcc $< -c -o $@ -g
