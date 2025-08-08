'use client';

import { useState } from 'react';

export default function ImageAnalyzePage() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) return;

    const base64 = image.split(',')[1]; // remove data:image/... prefix
    setLoading(true);

    const res = await fetch('/api/Analyze_image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ base64Image: base64 }),
    });

    const data = await res.json();
    setDescription(data.description || 'Failed to generate description.');
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Image Analyzer</h1>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze Image'}
      </button>

      {description && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h2 className="font-semibold">Description:</h2>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}
