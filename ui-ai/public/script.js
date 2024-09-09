
const models = {
    "model_default": "",
    "model_teacher": "Você é um professor, o usuário vai fazer perguntas e sempre depois de você responder, você deve fazer uma pergunta para o usuário para que ele responda, se ele não respoder, insista que ele responda",
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
