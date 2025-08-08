import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ message: "Upload failed" });
    }

    const file = files.audio;

    if (!file) return res.status(400).json({ message: "No audio uploaded" });

    const path = file[0].filepath;
    console.log("Audio file saved at:", path);

    // Just a dummy analysis for now
    const stats = fs.statSync(path);
    const sizeInKB = (stats.size / 1024).toFixed(2);

    // Replace this with actual audio analysis logic (ffmpeg.wasm etc.)

    res.status(200).json({
      message: "Audio uploaded successfully",
      size: `${sizeInKB} KB`,
    });
  });
}
