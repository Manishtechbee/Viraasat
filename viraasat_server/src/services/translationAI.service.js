import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL =
  process.env.GEMINI_MODEL ||
  "gemini-3.1-flash-lite";

export const translateTextsWithAI = async ({
  sourceLanguage = "en",
  targetLanguage,
  texts,
}) => {
  if (!targetLanguage) {
    throw new Error(
      "Target language is required"
    );
  }

  if (!Array.isArray(texts) || texts.length === 0) {
    return [];
  }

  const prompt = `
You are the official multilingual translation engine
for Viraasat, an Indian cultural heritage tourism platform.

Translate the provided UI strings from ${sourceLanguage}
to ${targetLanguage}.

Rules:

1. Preserve the original meaning.
2. Use natural, user-friendly language.
3. Preserve proper nouns such as:
   Taj Mahal, Hampi, Viraasat, AI Guide.
4. Do not translate URLs.
5. Do not translate email addresses.
6. Preserve numbers and currency values.
7. Preserve placeholders exactly.
8. Do not add explanations.
9. Return only the requested JSON structure.
10. Translate UI text naturally for an Indian tourism website.

Input:
${JSON.stringify(texts, null, 2)}
`;

  const response =
    await ai.models.generateContent({
      model: MODEL,

      contents: prompt,

      config: {
        responseMimeType:
          "application/json",

        responseSchema: {
          type: "array",

          items: {
            type: "object",

            properties: {
              key: {
                type: "string",
              },

              sourceText: {
                type: "string",
              },

              translatedText: {
                type: "string",
              },
            },

            required: [
              "key",
              "sourceText",
              "translatedText",
            ],
          },
        },
      },
    });

  const result = JSON.parse(
    response.text
  );

  return result;
};
