import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// Create this CSS file for styling

const UserForm = () => {
  // Form states
  const [name, setName] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [images, setImages] = useState([]);

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState([]);

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const files = [...e.target.files];
    setImages(files);

    // Create preview URLs
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreview(previewUrls);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("socialHandle", socialHandle);
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setName("");
      setSocialHandle("");
      setImages([]);
      setPreview([]);

      alert("User submitted successfully!");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while submitting the form"
      );
      console.error("Error submitting user:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cleanup preview URLs when component unmounts
  React.useEffect(() => {
    return () => {
      preview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [preview]);

  return (
    <div className="form-container">
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="socialHandle">Social Media Handle:</label>
          <input
            id="socialHandle"
            type="text"
            placeholder="Enter your social media handle"
            value={socialHandle}
            onChange={(e) => setSocialHandle(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="images">Images:</label>
          <input
            id="images"
            type="file"
            multiple
            onChange={handleImageChange}
            accept="image/*"
            required
            disabled={loading}
          />
        </div>

        {preview.length > 0 && (
          <div className="image-preview">
            {preview.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Preview ${index + 1}`}
                className="preview-image"
              />
            ))}
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
