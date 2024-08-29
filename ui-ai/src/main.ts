import express from "express";
import gemini from "./gemini";

const port = 3000;
const app = express();

app.use(express.static("public"))

app.use(express.json());

app.post("/api/chat", async (req, res) => {
    if (!req.body || typeof req.body != "object" || typeof req.body["prompt"] != "string") {
        res.status(400).send();
        return;
    }
    const reply = await gemini(req.body.prompt);
    res.send({ reply });
});

app.listen(port, () => {
    console.log(`escutando na porta ${port}`);
});
