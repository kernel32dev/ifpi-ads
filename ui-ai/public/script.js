
const conversation = [];

document.addEventListener("DOMContentLoaded", () => {
    const input_box = document.getElementById("input_box");
    input_box.addEventListener("keydown", ev => {
        if (ev.key == "Enter" && !ev.shiftKey && !ev.ctrlKey && waitingForUserInput()) {
            ev.preventDefault();
            const prompt = input_box.innerText.trim();
            if (!prompt) return;
            input_box.innerHTML = "";
            input_box.setAttribute("contenteditable", "false");
            deleteWelcome();
            sendPrompt(prompt).finally(() => {
                input_box.setAttribute("contenteditable", "true");
            });
        }
    });
});

function sendPrompt(prompt) {
    const output = document.getElementById("output");

    const div = document.createElement("div");
    div.classList.add("user_prompt");
    div.innerText = prompt;

    const hr1 = document.createElement("hr");
    const hr2 = document.createElement("hr");

    if (output.children.length != 0) {
        output.appendChild(hr1);
    }

    output.appendChild(div);
    output.appendChild(hr2);

    return fetch("/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ conversation: [...conversation, prompt] })
    }).then(res => res.json()).then(({ markdown, html }) => {
        conversation.push(prompt, markdown);
        output.insertAdjacentHTML("beforeend", html);
        scrollToBottom();
    }).catch(e => {
        hr1.remove();
        div.remove();
        hr2.remove();
        throw e;
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
