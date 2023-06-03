import { question } from 'readline-sync';

const MSG_OK = "[ \x1b[32m\x1b[1mOK\x1b[0m ]";
const MSG_ERROR = "[\x1b[31m\x1b[1mERRO\x1b[0m]";

export const TEST_DICT = {
    "Menu 1 e 4": [
        "<1",
        "<3",
        "<4",
        "<4",
        ">4,4,4",
    ], "Menu 2 e 4": [
        "<2",
        ">Informe nada para concluir",
        "<1",
        "<2",
        "<3",
        "<",
        "<4",
        ">1,2,3",
    ], "Menu 5": [
        "<5",
        "<2",
        "<4",
        ">1,4,9",
    ], "Menu 6": [
        "<2",
        ">Informe nada para concluir",
        "<-10",
        "<-1",
        "<0",
        "<1",
        "<11",
        "<",
        "<6",
        ">número de positivos: 2",
        ">número de negativos: 2",
        ">número de zeros: 1",
    ], "Menu 7": [
        "<7",
        ">somatório geral: 1",
        ">somatório dos positivos: 12",
        ">somatório dos negativos: -11",
    ], "Menu 8 número impar de itens": [
        "<8",
        ">média: 0.2",
        ">mediana: 0",
    ], "Menu 8 número par de itens": [
        "<2",
        ">Informe nada para concluir",
        "<-10",
        "<-1",
        "<0",
        "<1",
        "<11",
        "<200",
        "<",
        "<8",
        ">média: 33.5",
        ">mediana: 0.5",
    ], "Menu 9": [
        "<9",
        ">maior: 200",
        ">menor: -10",
    ], "Menu 12 equivalente": [
        "<12",
        ">Informe nada para concluir",
        "<-10",
        "<-1",
        "<0",
        "<1",
        "<11",
        "<200",
        "<",
        ">O vetor informado e o vetor atual são identicos",
    ], "Menu 12 diferentes": [
        "<12",
        ">Informe nada para concluir",
        "<-10",
        "<-1",
        "<-4",
        "<1",
        "<11",
        "<200",
        "<",
        ">O vetor informado e o vetor atual são diferentes",
    ], "Menu 13": [
        "<13",
        "<3",
        ">3 maiores:",
        ">1º: 200",
        ">2º: 11",
        ">3º: 1",
    ], "Menu 14": [
        "<14",
        "<4",
        ">4 menores:",
        ">1º: -10",
        ">2º: -1",
        ">3º: 0",
        ">4º: 1",
    ], "Menu 15": [
        "<15",
        ">Média: 33.5",
        ">Maiores:",
        ">200",
        ">Menores:",
        ">-10,-1,0,1,11",
    ], "Menu 16": [
        "<16",
        ">Rust",
    ], "Menu 17": [
        "<2",
        ">Informe nada para concluir",
        "<-10",
        "<-1",
        "<0",
        "<1",
        "<10",
        "<",
        "<17",
        ">Somatório da média dos números positivos múltiplos dois com o produto acumulado dos números negativos pares reduzidos à metade",
        ">é igual a -3",
    ], "Menu 18": [
        "<2",
        ">Informe nada para concluir",
        "<6",
        "<2",
        "<9",
        "<4",
        "<18",
        "<4",
        "<4",
        "<",
        "<18",
        "<4",
        ">2,4,4,4,6,9,18",
    ], "Menu 19": [
        "<19",
        "<4",
        ">18,9,6,4,4,4,2",
    ], "Menu 20": [
        "<20",
        "<3",
        "<5",
        "<4",
        ">4,4,4,2",
    ], "Menu 0": [
        "<0",
        ">tchau"
    ]
};

export function Test(tests) {
    if (tests === null) {
        this.generate = true;
    } else {
        this.test = 0;
        this.test_step = 0;
        this.tests = Object.values(tests);
        this.test_names = Object.keys(tests);
    }
}

Test.prototype.question = function(prompt) {
    if (this.generate) {
        return question("<");
    }
    let expect = this.next();
    if (expect.startsWith(">")) {
        expect = expect.substr(1);
        console.log(`${MSG_ERROR} teste \"${this.test_names[this.test]}\" falhou`);
        console.log(`esperava-se que o programa escrevesse ${JSON.stringify(expect)} mas ao invés disso o programa fez uma pergunta ${JSON.stringify(prompt)}`);
        process.exit(1);
    } else if (expect.startsWith("<")) {
        expect = expect.substr(1);
        console.log(prompt + expect);
        return expect;
    } else {
        console.log(`${MSG_ERROR} teste \"${this.test_names[this.test]}\" falhou`);
        console.log(`todos os testes devem começar com ">" ou "<" mas ${JSON.stringify(expect)} não começa com nenhum desses`);
        process.exit(1);
    }
}

Test.prototype.put = function(msg) {
    if (this.generate) {
        console.log(">" + msg);
        return;
    }
    console.log(msg);
    msg = String(msg);
    // se não estiver esperando resposta, ignora
    if (this.peek().startsWith("<")) return;
    let expect = this.next();
    if (expect.startsWith(">")) {
        expect = expect.substr(1);
        if (expect !== msg) {
            console.log(`${MSG_ERROR} teste \"${this.test_names[this.test]}\" falhou`);
            console.log(`esperava-se que o programa escrevesse ${JSON.stringify(expect)} mas ao invés disso o programa escreveu ${JSON.stringify(msg)}`);
            process.exit(1);
        }
    } else {
        console.log(`${MSG_ERROR} teste \"${this.test_names[this.test]}\" falhou`);
        console.log(`todos os testes devem começar com ">" ou "<" mas ${JSON.stringify(expect)} não começa com nenhum desses`);
        process.exit(1);
    }
}

Test.prototype.peek = function() {
    if (this.test >= this.tests.length) {
        return undefined;
    }
    return this.tests[this.test][this.test_step];
}

Test.prototype.next = function() {
    if (this.test >= this.tests.length) {
        return undefined;
    }
    let text = this.tests[this.test][this.test_step];
    this.test_step += 1;
    if (this.test_step === this.tests[this.test].length) {
        console.log(`${MSG_OK} teste \"${this.test_names[this.test]}\" concluído`);
        this.test += 1;
        this.test_step = 0;
        if (this.test >= this.tests.length) {
            console.log(`${MSG_OK} todos os testes passaram`);
            process.exit(0);
        }
    }
    return text;
}

Test.prototype.done = function(msg) {
    return this.test >= this.tests.length;
}

export let test = null;
