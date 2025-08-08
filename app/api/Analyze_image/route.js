import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { base64Image } = await req.json();

    const response = await fetch(`https://generativeai.googleapis.com/v1/models/gemini-pro-vision:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "Describe this image in detail.",
              },
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: base64Image,
                },
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    console.log("Gemini API response:", JSON.stringify(data, null, 2));

    const description = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No description found.";
    return NextResponse.json({ description });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
