
export function flip(mensagem: string, index: number): string {
    const antes = mensagem.slice(0, index);
    const ajuste = mensagem[index] == "1" ? "0" : "1";
    const depois = mensagem.slice(index + 1);
    return antes + ajuste + depois;
}

export function trimStartZeros(data: string): string {
    return data.replaceAll("0", " ").trimStart().replaceAll(" ", "0");
}

export function isPowerOfTwo(num: number): boolean {
    return Number.isInteger(Math.log2(num));
}

export function isEven(num: number): boolean {
    return !(num & 1);
}

export function rng(max: number): number {
    return Math.floor(Math.random() * max);
}
