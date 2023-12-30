// server/controllers/documentController.ts
import { Request, Response } from "express";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
const generateDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const { githubRepo, textCode, apiKey } = req.body;

    if (!githubRepo && !textCode) {
      res
        .status(400)
        .json({ error: "Provide either GitHub repository or text code" });
      return;
    }

    const prompt = githubRepo
      ? await fetchCodeFromGitHub(githubRepo)
      : textCode;

    if (!prompt) {
      res.status(400).json({ error: "Failed to fetch code" });
      return;
    }

    const generatedDocument = await getRespFromModel(prompt, apiKey);

    res.json({ document: generatedDocument });
  } catch (error) {
    console.error("Error generating document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchCodeFromGitHub = async (
  githubRepo: string
): Promise<string | null> => {
  try {
    const githubResponse = await axios.get(
      `https://api.github.com/repos/${githubRepo}/contents`
    );
    const codeFiles = await Promise.all(
      githubResponse.data.map((file: any) => axios.get(file.download_url))
    );
    const code = codeFiles.map((response: any) => response.data).join("\n");
    return code;
  } catch (error) {
    console.error("Error fetching code from GitHub:", error);
    return null;
  }
};

async function getRespFromModel(
  prompt: string,
  apiKey: string
): Promise<string> {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const generationConfig = {
      // maxOutputTokens: 2000,
      temperature: 0.2,
      topP: 0.1,
      topK: 16,
    };
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig,
    });
    const result = await model.generateContent(
      `Give me technical document for this code in markdown: ${prompt}`
    );
    const response = await result.response;
    const text = response.text();
    console.log("resp ", text);
    return text;
  } catch (error) {
    console.error("Error generating document:", error);
    throw new Error("Failed to generate document");
  }
}

export { generateDocument };
