import express from "express";
import gemini from "./gemini";
import showdown from "showdown";

const converter = new showdown.Converter();

const port = 3000;
const app = express();

app.use(express.static("public"))

app.use(express.json());

app.post("/api/chat", async (req, res) => {
    if (!req.body || typeof req.body != "object" || typeof req.body["prompt"] != "string") {
        res.status(400).send();
        return;
    }
    const markdown = await gemini(req.body.prompt);
    const html = converter.makeHtml(markdown);
    res.contentType("text/html").send(html);
});

app.listen(port, () => {
    console.log(`escutando na porta ${port}`);
});
