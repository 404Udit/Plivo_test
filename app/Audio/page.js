"use client";

import { useState } from "react";

export default function AudioUploader() {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    const file = e.target.audio.files[0];

    if (!file) {
      alert("Please select an audio file");
      setLoading(false);
      return;
    }

    formData.append("audio", file);

    try {
      const res = await fetch("/api/transcribe-audio", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setTranscript(data.transcript || "No transcription found");
    } catch (err) {
      console.error(err);
      setTranscript("Error occurred during transcription");
    }

    setLoading(false);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Audio Transcriber</h1>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          name="audio"
          accept="audio/*"
          className="mb-4"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Transcribing..." : "Upload & Transcribe"}
        </button>
      </form>

      {transcript && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Transcript:</h2>
          <p className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">
            {transcript}
          </p>
        </div>
      )}
    </div>
  );
}
