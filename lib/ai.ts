import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function basicSentiment(reviews: any[]) {

  const text = reviews.map(r => r.content).join(" ").toLowerCase();

  const positiveWords = ["great", "amazing", "good", "love", "excellent", "fantastic"];
  const negativeWords = ["bad", "boring", "terrible", "awful", "poor"];

  let score = 0;

  positiveWords.forEach(word => {
    if (text.includes(word)) score++;
  });

  negativeWords.forEach(word => {
    if (text.includes(word)) score--;
  });

  if (score > 0) return "Positive";
  if (score < 0) return "Negative";
  return "Mixed";
}

export async function analyzeSentiment(reviews: any[]) {

  if (!reviews || reviews.length === 0) {
    return {
      summary: "No audience reviews available.",
      sentiment: "Mixed"
    };
  }

  try {

    const reviewText = reviews.map(r => r.content).join("\n\n");

    const prompt = `
Summarize the audience sentiment in 3 lines.
Classify overall sentiment as Positive, Mixed, or Negative.

Return JSON:

{
 "summary": "...",
 "sentiment": "Positive"
}

Reviews:
${reviewText}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [{ role: "user", content: prompt }]
    });

    const result = response.choices[0].message.content;

    return JSON.parse(result!);

  } catch (error) {

    // fallback sentiment
    const sentiment = basicSentiment(reviews);

    return {
      summary: "AI quota exceeded. Basic sentiment analysis used from audience reviews.",
      sentiment
    };

  }
}