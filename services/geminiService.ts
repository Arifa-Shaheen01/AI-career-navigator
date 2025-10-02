import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
if (!process.env.API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getCareerDetails = async (programName: string): Promise<string> => {
  try {
    const prompt = `
      Provide a detailed overview for a career path related to "${programName}".
      The overview should be concise, professional, and encouraging for a learner in India.
      Structure the response in three distinct sections:

      1.  **Career Description:** A brief paragraph explaining what professionals in this field do.
      2.  **Key Skills:** A bulleted list of 5-7 essential skills required for this role.
      3.  **Future Prospects:** A short paragraph on the job market outlook and potential growth in India for this career.

      Format the entire output as a single block of text, using markdown for headings (e.g., "**Career Description**") and bullet points (e.g., "- Skill 1").
      Do not use markdown code blocks (\`\`\`).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching career details from Gemini:", error);
    return "Could not load career details at this time. Please try again later.";
  }
};
