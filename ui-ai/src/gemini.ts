import { GoogleAIFileManager } from "@google/generative-ai/server";
import { type Content, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import fs from "node:fs";
import { createHash } from "node:crypto";

const geminiApiKey = process.env["API_KEY_GEMINI"];

if (!geminiApiKey) {
    throw new Error("API_KEY_GEMINI não foi especificada");
}

const fileManager = new GoogleAIFileManager(geminiApiKey);
const genAI = new GoogleGenerativeAI(geminiApiKey);

const modelCache = new Map<string, GenerativeModel>();
const uploadCache = loadUploadCache();

export default async function gemini(systemInstruction: string, encodedConversation: string[]): Promise<string> {
    const contents = await Promise.all(encodedConversation.map((text, index) => {
        const role = index % 2 ? "model" : "user";
        return parseContent(role, text);
    }));

    const model = getGenerativeModel(systemInstruction);
    const content = await model.generateContent({ contents });
    return content.response.text();
}

function parseContent(role: "model" | "user", text: string): Promise<Content> {
    const parts = [];
    while (text.startsWith("data:")) {
        let fileUri;
        [fileUri, text] = splitOnce(text, "\n");
        parts.push(upload(fileUri).then(fileData => ({fileData})));
    }
    parts.push({ text });
    return Promise.all(parts).then(parts => ({ role, parts }));
}

function getGenerativeModel(systemInstruction: string): GenerativeModel {
    const cached = modelCache.get(systemInstruction);
    if (cached) return cached;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction });
    modelCache.set(systemInstruction, model);
    return model;
}

async function upload(dataUri: string): Promise<{ mimeType: string, fileUri: string }> {
    debugger;
    const dataUriHash = md5(dataUri);
    const cached = uploadCache[dataUriHash];
    if (cached) return cached;
    const [mimeType, data] = splitOnce(dataUri.slice(5), ";base64,");
    if (!data) throw new Error("bad data uri");
    const fileName = `${new Date().getTime()}-${Math.random()}.tmp`
    await fs.promises.writeFile(fileName, data, { encoding: "base64" });
    const result = await fileManager.uploadFile(fileName, { mimeType });
    const upload = {
        mimeType: result.file.mimeType,
        fileUri: result.file.uri,
    };
    uploadCache[dataUriHash] = upload;
    fs.promises.rm(fileName);
    fs.promises.writeFile("upload-cache.json", JSON.stringify(uploadCache, null, 4));
    return upload;
}

function splitOnce(text: string, separator: string): [string, string] {
    const index = text.indexOf(separator);
    if (index == -1) return [text, ""];
    return [text.slice(0, index), text.slice(index + separator.length)];
}

function loadUploadCache(): Record<string, undefined | { mimeType: string, fileUri: string }> {
    try {
        const obj = JSON.parse(fs.readFileSync("upload-cache.json", "utf-8"))
        if (obj && typeof obj === "object") {
            return Object.setPrototypeOf(obj, null);
        }
    } catch (e) {}
    return Object.create(null);
}

function md5(text: string): string {
    const hash = createHash("md5");
    hash.update(text);
    return hash.digest("hex");
}
