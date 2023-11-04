import create from "prompt-sync";
const prompt = create();

export function askStr(ask: string): string {
    return prompt(ask).trim();
}

export function askEnter(ask: string = "aperte Enter para continuar") {
    prompt(ask);
}

export function askInt(ask: string, max: number, min: number = 0): number {
    while (true) {
        let num = Number(prompt(ask).trim());
        if (Number.isSafeInteger(num) && num >= min && num <= max) {
            return num;
        }
        console.log("Digite um número inteiro entre " + min + " e " + max);
    }
}
export function askIntOpt(ask: string, max: number, min: number = 0): number | null {
    while (true) {
        let text = prompt(ask).trim();
        if (text.length == 0) {
            return null;
        }
        let num = Number(text);
        if (Number.isSafeInteger(num) && num >= min && num <= max) {
            return num;
        }
        console.log("Digite um número inteiro entre " + min + " e " + max);
    }
}
