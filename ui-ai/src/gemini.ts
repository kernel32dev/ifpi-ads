import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey = process.env["API_KEY_GEMINI"];

if (!geminiApiKey) {
    throw new Error("API_KEY_GEMINI não foi especificada");
}

const genAI = new GoogleGenerativeAI(geminiApiKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export default async function gemini(prompt: string): Promise<string> {
    const content = await model.generateContent(prompt);
    return content.response.text();
}
