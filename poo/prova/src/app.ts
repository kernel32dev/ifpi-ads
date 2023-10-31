import { getMessage } from './lib';
import prompt_sync from "prompt-sync";

const prompt = prompt_sync();

let text: string = getMessage();
console.log(text);

let input: string = prompt(">>> ");
console.log(input);


