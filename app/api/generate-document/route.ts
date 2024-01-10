import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { OpenAI } from "openai";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const { url, githubUrl, textCode, apiKey, selectedModel }: any = data;
    if (!url && !githubUrl && !textCode) {
      return new NextResponse("Add required fields", { status: 500 });
    }

    let prompt = "";
    if (url) {
      prompt = `You are a great tool that generates a document in markdown that helps people get to know about a website, what it does, does it have APIs for developers, list those APIs, shows similar websites and links to it: ${url}`;
    } else {
      const data = githubUrl
        ? await fetchCodeFromGitHubUrl(githubUrl)
        : textCode;
      prompt = `Generate technical documentation in markdown for this code: ${data}`;
    }

    if (!prompt) {
      return NextResponse.json({ error: "Failed to fetch code" });
    }

    const generatedDocument = await getRespFromModel(
      prompt,
      apiKey,
      selectedModel
    );
    return NextResponse.json({ document: generatedDocument });
  } catch (error) {
    console.error("Error generating document:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}

async function fetchCodeFromGitHubUrl(
  githubUrl: string
): Promise<string | null> {
  try {
    const resp = await fetch(githubUrl)
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => console.log("github_error:", err));
    const arrOfCode = resp?.payload?.blob?.rawLines;
    const resultString = arrOfCode.filter(Boolean).join("\n");
    console.log(">>>", resultString);
    return resultString;
  } catch (error) {
    console.error("Error fetching code from GitHub:", error);
    return null;
  }
}

async function getRespFromModel(
  prompt: string,
  apiKey: string,
  model: string
): Promise<string | undefined> {
  if (model === "gemini-pro") {
    return getRespFromGoogle(prompt, apiKey, model);
  } else {
    return getRespFromOpenAI(prompt, apiKey, model);
  }
}

async function getRespFromOpenAI(
  prompt: string,
  apiKey: string,
  model: string
): Promise<string | undefined> {
  try {
    const openai = new OpenAI({
      apiKey: apiKey,
    });
    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
      // max_tokens: 2000,
    });

    return response?.choices[0]?.message?.content?.trim();
  } catch (error) {
    console.error("Error generating document:", error);
    throw new Error("Failed to generate document");
  }
}

async function getRespFromGoogle(
  prompt: string,
  apiKey: string,
  aiModel: string
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
      model: aiModel,
      generationConfig,
    });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error generating document:", error);
    return "Failed to generate document";
  }
}
