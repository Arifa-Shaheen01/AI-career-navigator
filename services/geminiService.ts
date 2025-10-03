import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from Vite environment variable
const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
  console.error("VITE_API_KEY is not set in your .env.local file.");
}

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(apiKey);

export const getCareerDetails = async (programName: string): Promise<string> => {
  try {
    const prompt = `
      Provide a detailed overview for a career path related to "${programName}".
      The overview should be concise, professional, and encouraging for a learner in India.
      Structure the response in three distinct sections:

      1. **Career Description:** A brief paragraph explaining what professionals in this field do.
      2. **Key Skills:** A bulleted list of 5-7 essential skills required for this role.
      3. **Future Prospects:** A short paragraph on the job market outlook and potential growth in India for this career.

      Format the entire output as a single block of text, using markdown for headings (e.g., "**Career Description**") and bullet points (e.g., "- Skill 1").
      Do not use markdown code blocks (\`\`\`).
    `;

    // Choose model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content
    const result = await model.generateContent(prompt);

    // Extract text
    return result.response.text();
  } catch (error) {
    console.error("Error fetching career details from Gemini:", error);
    return "⚠️ Could not load career details at this time. Please try again later.";
  }
};