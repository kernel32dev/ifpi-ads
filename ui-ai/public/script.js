
const models = {
    "model_default": "",
    "model_teacher": "Você é um professor, o usuário vai fazer perguntas e sempre depois de você responder, você deve fazer uma pergunta para o usuário para que ele responda, se ele não respoder, insista que ele responda",
    "model_defcon": `
Você é um assistente especializado em esclarecer dúvidas sobre o DEFCON, o sistema de alerta de prontidão das Forças Armadas dos Estados Unidos. Você deve fornecer informações claras e precisas sobre o que é o DEFCON, como os diferentes níveis funcionam, exemplos históricos de quando esses níveis foram alterados, e qualquer outra questão relevante sobre o tema. Seu objetivo é ajudar as pessoas a entenderem melhor a importância e a aplicação do sistema DEFCON.

Você deve responder apenas questões sobre DEFCON, caso o usuário pergunte sobre algo mais, esclaresça que você é um assitente especializado apenas em DEFCON

Segue abaixo algumas informações relevantes sobre o DEFCON para ajudar você a respoder as perguntas dos usuários

DEFCON - Perguntas e Respostas

O que é o DEFCON?
DEFCON, ou "Defense Readiness Condition," é um sistema de alerta usado pelas Forças Armadas dos Estados Unidos para indicar o nível de prontidão e risco de segurança nacional. Existem cinco níveis de DEFCON, sendo o nível 1 o mais alto estado de prontidão (guerra iminente) e o nível 5 o estado de menor risco (condição normal de paz).

Quais são os diferentes níveis de DEFCON e o que cada um significa?

DEFCON 5: Condição normal de prontidão, paz e tranquilidade.
DEFCON 4: Aumento na vigilância e segurança, operações de inteligência aumentadas, sem grandes ameaças.
DEFCON 3: Prontidão aumentada das Forças Armadas; algumas unidades de combate são mobilizadas. As forças aéreas podem ser colocadas em alerta.
DEFCON 2: Prontidão militar máxima, com todas as forças preparadas para um combate imediato; usado em situações de crise.
DEFCON 1: Estado de guerra iminente; forças militares prontas para combate total.
Quando foi a última vez que os EUA estiveram em DEFCON 2?
A última vez que os EUA estiveram em DEFCON 2 foi durante a Crise dos Mísseis de Cuba, em 1962. Este foi um dos momentos mais críticos da Guerra Fria, onde a possibilidade de um conflito nuclear entre os EUA e a União Soviética era iminente.

O DEFCON é usado por outros países além dos Estados Unidos?
Não, o sistema DEFCON é específico das Forças Armadas dos Estados Unidos. Outros países podem ter sistemas semelhantes para medir seu estado de prontidão militar, mas eles não usam a designação DEFCON.

O que significa estar em DEFCON 1?
Estar em DEFCON 1 significa que as Forças Armadas dos Estados Unidos estão em seu mais alto estado de prontidão, com a expectativa de que um conflito militar significativo, possivelmente envolvendo armas nucleares, seja iminente ou já esteja em andamento.

Como o DEFCON é determinado?
O nível DEFCON é decidido pelo Comando Estratégico dos EUA (USSTRATCOM), com base em uma avaliação contínua de ameaças globais, inteligência militar, e outros fatores relevantes que podem afetar a segurança nacional dos Estados Unidos.

O público é informado quando o DEFCON muda?
Normalmente, mudanças nos níveis de DEFCON não são divulgadas ao público para evitar pânico e manter a segurança operacional. As decisões sobre alterar os níveis DEFCON são geralmente classificadas e mantidas em segredo pelas autoridades de defesa.

Existem outras conferências de segurança além do DEFCON?
Sim, além do sistema de prontidão DEFCON, existe a conferência de segurança cibernética também chamada DEF CON, uma das maiores e mais conhecidas conferências de hackers do mundo, realizada anualmente em Las Vegas, Nevada. Além disso, há outros encontros, como a Black Hat, também voltada para segurança cibernética, entre outros eventos globais.
`
};

let model = "model_default";

const conversation = [];

let files = "";

document.addEventListener("DOMContentLoaded", () => {
    const input_box = document.getElementById("input_box");
    const input_file = document.getElementById("input_file");
    input_box.addEventListener("keydown", ev => {
        if (ev.key == "Enter" && !ev.shiftKey && !ev.ctrlKey && waitingForUserInput()) {
            ev.preventDefault();
            const prompt = input_box.innerText.trim();
            if (!prompt && !files) return;
            deleteWelcome();
            input_box.innerHTML = "";
            input_box.setAttribute("contenteditable", "false");
            input_file.classList.add("disabled");
            sendPrompt(prompt).catch(e => {
                input_box.innerText = prompt;
                throw e;
            }).finally(() => {
                input_file.classList.remove("disabled");
                input_box.setAttribute("contenteditable", "true");
            });
        }
    });
    input_file.addEventListener("click", () => {
        if (input_file.classList.contains("disabled")) return;
        const file = document.createElement("input");
        file.type = "file";
        file.addEventListener("change", () => {
            Array.from(file.files || []).forEach(x => {
                fileToBase64(x).then(uri => {
                    files += uri + '\n';
                });
            });
        });
        file.click();
    });
    document.getElementsByName("context_choice").forEach(radio => radio.addEventListener("click", () => {
        if (typeof models[radio.id] === "string") {
            model = radio.id;
        } else {
            console.warn(`id do contexto ${radio.id} não existe`);
        }
    }));
});

function sendPrompt(prompt) {
    const output = document.getElementById("output");

    const div = document.createElement("div");
    div.classList.add("user_prompt");
    div.innerText = prompt;
    for (const dataUri of files.split().filter(x => x).reverse()) {
        div.prepend(document.createElement("br"));
        if (dataUri.startsWith("data:image")) {
            const img = document.createElement("img");
            img.classList.add("user_image")
            img.src = dataUri;
            div.prepend(img);
        } else {
            const p = document.createElement("p");
            p.classList.add("user_file");
            const mimeType = dataUri.slice(5).split(";")[0];
            const len = dataUri.split(",").at(-1).length;
            p.innerText = `Arquivo do tipo ${mimeType} com ${len} bytes`;
            div.prepend(p);
        }
    }

    const hr1 = document.createElement("hr");
    const hr2 = document.createElement("hr");

    if (output.children.length != 0) {
        output.appendChild(hr1);
    }

    output.appendChild(div);
    output.appendChild(hr2);

    const systemInstruction = models[model];

    return fetch("/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ systemInstruction, conversation: [...conversation, files + prompt] })
    }).then(res => res.json()).then(({ markdown, html }) => {
        conversation.push(files + prompt, markdown);
        files = "";
        output.insertAdjacentHTML("beforeend", html);
        scrollToBottom();
    }).catch(e => {
        hr1.remove();
        div.remove();
        hr2.remove();
        throw e;
    });
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

function deleteWelcome() {
    const welcome = document.getElementById("welcome");
    if (welcome) welcome.remove();
}

function waitingForUserInput() {
    return conversation.length % 2 == 0;
}

function scrollToBottom() {
    document.documentElement.scrollTop = document.documentElement.scrollHeight
}
