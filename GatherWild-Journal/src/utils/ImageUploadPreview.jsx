import React, { useEffect, useState } from "react";

// Validates an image file and displays a preview

export default function ImageUploadPreview({ file }) {
    const [previewSource, setPreviewSource] = useState(null);
    const [error, setError] = useState("");

    // handles file selection
    useEffect(() => {
        if (!file) {
            setError("");
            setPreviewSource(null);
            return;
        }

        // validate file type
        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file");
            setPreviewSource(null);
            return;
        }

        // clear previous errors
        setError("");

        // create preview as URL object
        const objectURL = URL.createObjectURL(file);
        setPreviewSource(objectURL);

        // release object URL when file changes
        return () => URL.revokeObjectURL(objectURL);
    }, [file]);


    return (
        <div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {previewSource && (
                <div className="">
                    <label>Preview:</label>
                    <img
                        src={previewSource}
                        alt="Uploaded image preview"
                        className="preview-img"
                    />
                </div>
            )}
        </div>
    )
}
