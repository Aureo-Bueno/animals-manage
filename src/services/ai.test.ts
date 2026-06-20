import * as ai from "./ai";

const mockGenerateContent = jest.fn().mockResolvedValue({ text: "mocked response" });

jest.mock("@google/genai", () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({
    models: { generateContent: mockGenerateContent },
  })),
}));

describe("generateDescription", () => {
  it("returns a string from the AI response", async () => {
    const result = await ai.generateDescription({ name: "Rex", species: "Dog" });
    expect(result).toBe("mocked response");
    expect(mockGenerateContent).toHaveBeenCalledTimes(1);
  });
});

describe("extractAnimalData", () => {
  beforeEach(() => {
    mockGenerateContent.mockResolvedValue({ text: '{"name":"Luna","species":"Cat"}' });
  });

  it("parses JSON from AI response", async () => {
    const result = await ai.extractAnimalData("Luna is a cat");
    expect(result).toEqual({ name: "Luna", species: "Cat" });
  });

  it("strips markdown fences", async () => {
    mockGenerateContent.mockResolvedValue({ text: '```json\n{"name":"Luna"}\n```' });
    const result = await ai.extractAnimalData("Luna");
    expect(result).toEqual({ name: "Luna" });
  });
});

describe("searchAnimalsByQuery", () => {
  beforeEach(() => {
    mockGenerateContent.mockResolvedValue({ text: "[1, 3]" });
  });

  it("returns an array of matching IDs", async () => {
    const animals = [
      { id: 1, name: "Rex", species: "Dog" },
      { id: 2, name: "Mimi", species: "Cat" },
    ];
    const result = await ai.searchAnimalsByQuery("dog", animals);
    expect(result).toEqual([1, 3]);
  });
});

describe("classifyBehavior", () => {
  beforeEach(() => {
    mockGenerateContent.mockResolvedValue({ text: "Playful" });
  });

  it("returns the classified temperament", async () => {
    const result = await ai.classifyBehavior("Loves to play fetch");
    expect(result).toBe("Playful");
  });
});

describe("generateTags", () => {
  beforeEach(() => {
    mockGenerateContent.mockResolvedValue({ text: '["friendly", "largeSize"]' });
  });

  it("returns an array of tags", async () => {
    const result = await ai.generateTags({ name: "Rex", size: "Large" });
    expect(result).toEqual(["friendly", "largeSize"]);
  });
});
