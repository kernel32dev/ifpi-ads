import express from "express";
import gemini from "./gemini";
import showdown from "showdown";

const converter = new showdown.Converter({
    noHeaderId: true,
});

const port = 3000;
const app = express();

app.use(express.static("public"))

app.use(express.json({
    limit: Infinity
}));

app.post("/api/chat", async (req, res) => {
    if (
        !req.body || typeof req.body != "object"
        || !req.body["conversation"] || typeof req.body["conversation"] != "object"
        || typeof req.body["systemInstruction"] != "string"
    ) {
        res.status(400).send();
        return;
    }
    const systemInstruction = req.body.systemInstruction;
    const conversation = req.body.conversation;
    if (
        !Array.isArray(conversation)
        || !conversation.every(x => typeof x == "string")
        || conversation.length % 2 != 1
    ) {
        res.status(400).send();
        return;
    }
    const markdown = await gemini(systemInstruction, conversation);
    const html = converter.makeHtml(markdown);
    res.send({ markdown, html });
});

app.listen(port, () => {
    console.log(`escutando na porta ${port}`);
});
