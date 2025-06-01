import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateBrandStory(name: string, description: string) {
  try {
    const prompt = `Generate a detailed brand story for the name "${name}" for a business described as: "${description}". 
    Include:
    1. A compelling story explaining why this name was chosen
    2. The meaning and symbolism behind the name
    3. Cultural significance in different markets
    4. Pronunciation guide in English, Spanish, and Chinese
    5. Brand personality traits
    6. Marketing angles
    7. Visual identity suggestions

    Format the response as a JSON object with the following structure:
    {
      "story": "detailed story here",
      "meaning": "meaning explanation here",
      "culturalSignificance": ["point 1", "point 2", "point 3"],
      "pronunciation": {
        "english": "pronunciation",
        "spanish": "pronunciation",
        "chinese": "pronunciation"
      },
      "brandPersonality": {
        "traits": ["trait 1", "trait 2", "trait 3"],
        "marketingAngles": ["angle 1", "angle 2", "angle 3"],
        "visualIdentity": ["suggestion 1", "suggestion 2", "suggestion 3"]
      }
    }`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview",
      response_format: { type: "json_object" },
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}');
    return response;
  } catch (error) {
    console.error('Error generating brand story:', error);
    return null;
  }
} 