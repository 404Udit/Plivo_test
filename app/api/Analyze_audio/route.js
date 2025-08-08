import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import FormData from "form-data";
import dotenv from "dotenv"

dotenv.config();

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const form = new formidable.IncomingForm({ keepExtensions: true });

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return reject(NextResponse.json({ error: "Failed to parse form data" }, { status: 500 }));
      }

      const audio = files.audio?.[0];
      if (!audio) {
        return reject(NextResponse.json({ error: "No audio uploaded" }, { status: 400 }));
      }

      const audioStream = fs.createReadStream(audio.filepath);

      const formData = new FormData();
      formData.append("file", audioStream, audio.originalFilename);
      formData.append("model", "whisper-1");

      const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: formData,
      });

      const data = await response.json();
      resolve(NextResponse.json({ transcript: data.text }));
    });
  });
}
