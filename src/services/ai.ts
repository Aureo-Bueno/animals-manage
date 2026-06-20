import { GoogleGenAI } from "@google/genai";
import type { AnimalData } from "../store/animal/types";

let client: GoogleGenAI | null = null;

function getApiKey(): string {
  return process.env.VITE_GEMINI_API_KEY ?? "";
}

function getClient(): GoogleGenAI {
  if (!client) {
    const apiKey = getApiKey();
    if (!apiKey || apiKey === "your_api_key_here") {
      throw new Error(
        "Set VITE_GEMINI_API_KEY in your .env file with a valid Google AI Studio key."
      );
    }
    client = new GoogleGenAI({ apiKey });
  }
  return client;
}

const MODEL = "gemini-2.5-flash";

function cleanJson(text: string): string {
  return text.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
}

export async function generateDescription(
  data: Partial<AnimalData>
): Promise<string> {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are an assistant for an animal adoption platform. Generate a warm and friendly adoption description in English (2-3 sentences). Include personality traits and adoption appeal.

Animal data:
${JSON.stringify(data, null, 2)}`,
          },
        ],
      },
    ],
  });
  return response.text ?? "";
}

export async function extractAnimalData(
  text: string
): Promise<Partial<AnimalData>> {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are an assistant for an animal adoption platform. Extract animal information from the text below and return ONLY valid JSON (no markdown, no extra code).

Available fields (return only what you find):
- name (string): animal's name
- species (string): species (Dog, Cat, etc)
- age (number): approximate age in years
- size (string): size ("Small", "Medium", "Large")
- temperament (string): temperament
- energyLevel (string): energy level ("Low", "Medium", "High")
- castrated (boolean): whether castrated
- vaccinated (boolean): whether vaccinated

Text:
${text}`,
          },
        ],
      },
    ],
  });
  const cleaned = cleanJson(response.text ?? "{}");
  return JSON.parse(cleaned);
}

export async function searchAnimalsByQuery(
  query: string,
  animals: Array<{
    id: number;
    name: string;
    species: string;
    age?: number;
    size?: string;
    description?: string;
    temperament?: string;
    tags?: string[];
  }>
): Promise<number[]> {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are a search assistant for an animal adoption platform. Given a natural language query and a list of animals, return ONLY a JSON array with the IDs of matching animals. Consider name, species, age, size, description, temperament, and tags.

Query: "${query}"

Animals:
${JSON.stringify(animals, null, 2)}

Return ONLY a JSON array of numbers, e.g. [1, 3]`,
          },
        ],
      },
    ],
  });
  const cleaned = cleanJson(response.text ?? "[]");
  return JSON.parse(cleaned);
}

export async function classifyBehavior(
  observations: string
): Promise<string> {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are an assistant for an animal adoption platform. Based on observations about an animal's behavior, classify its dominant temperament.

Return ONLY one word: "Calm", "Playful", "Protective", "Social", "Independent"

Observations:
${observations}`,
          },
        ],
      },
    ],
  });
  return response.text?.trim() ?? "";
}

export async function generateTags(
  data: Partial<AnimalData>
): Promise<string[]> {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are an assistant for an animal adoption platform. Generate relevant tags for an adoption listing based on the animal data.

Return ONLY a JSON array of strings with 3 to 5 tags in English, using camelCase. Example: ["castrated", "largeSize", "friendly"]

Animal data:
${JSON.stringify(data, null, 2)}`,
          },
        ],
      },
    ],
  });
  const cleaned = cleanJson(response.text ?? "[]");
  return JSON.parse(cleaned);
}
