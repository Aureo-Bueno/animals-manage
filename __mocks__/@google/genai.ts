export class GoogleGenAI {
  constructor(_config: { apiKey?: string }) {}

  models = {
    generateContent: async () => ({ text: "" }),
    generateContentStream: async function* () {},
  };
}
