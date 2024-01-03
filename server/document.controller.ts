import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function generateDocument(req: Request, res: Response): Promise<void> {
  try {
    const { githubUrl, textCode, apiKey } = req.body;
    console.log("apikey here: ", apiKey);
    if (!githubUrl && !textCode) {
      res
        .status(400)
        .json({ error: "Provide either GitHub repository or text code" });
      return;
    }

    const prompt = githubUrl
      ? await fetchCodeFromGitHubUrl(githubUrl)
      : textCode;

    if (!prompt) {
      res.status(400).json({ error: "Failed to fetch code" });
      return;
    }
    const generatedDocument = await getRespFromModel(prompt, apiKey);
    res.json({ document: generatedDocument });
    // res.send(prompt);
  } catch (error) {
    console.error("Error generating document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function fetchCodeFromGitHubUrl(githubUrl: string): Promise<any | null> {
  try {
    const resp = await fetch(githubUrl)
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => console.log("github_error:", err));
    const arrOfCode = resp?.payload?.blob?.rawLines;
    const resultString = arrOfCode.filter(Boolean).join("\n");
    return resultString;
  } catch (error) {
    console.error("Error fetching code from GitHub:", error);
    return null;
  }
}

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
    return text;
  } catch (error) {
    console.error("Error generating document:", error);
    throw new Error("Failed to generate document");
  }
}

export { generateDocument };
