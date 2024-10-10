import React, { useState, useEffect } from "react";
import { Image } from "primereact/image";
import { RxCross2 } from "react-icons/rx";

// React.memo to prevent unnecessary re-renders
export default React.memo(function MultiFileUpload({ formik, name, baseURL }) {
  const { values, setFieldValue } = formik;
  const [dragActive, setDragActive] = useState(false);
  
  // Detect if the user is on a mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Handle file input change
  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);

    // Only add valid files
    const validFiles = uploadedFiles.filter((file) => file instanceof File);
    setFieldValue(name, [...(values[name] || []), ...validFiles]);
  };

  // Handle drag enter
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  // Handle drag leave
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);

    // Only add valid files
    const validFiles = droppedFiles.filter((file) => file instanceof File);
    setFieldValue(name, [...(values[name] || []), ...validFiles]);
  };

  // Remove a specific file from the Formik values
  const removeFile = (fileToRemove) => {
    if (fileToRemove instanceof File) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    setFieldValue(
      name,
      values[name].filter((file) => file !== fileToRemove)
    );
  };

  // Cleanup object URLs on component unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (values[name]) {
        values[name].forEach(file => {
          if (file instanceof File) {
            URL.revokeObjectURL(file.preview);
          }
        });
      }
    };
  }, [values, name]);

  return (
    <div className="multipule-file-upload-wrapper row">
      {/* Drag and Drop Area */}
      <div className="col-md-6">
        <div>
          <input
            type="file"
            id="image"
            multiple
            hidden
            onChange={handleFileChange}
          />
          <label
            htmlFor="image"
            className={`multipule-image-uploader mb-4 ${
              dragActive ? "drag-active" : ""
            }`}
            onDragEnter={!isMobile ? handleDragEnter : null}
            onDragLeave={!isMobile ? handleDragLeave : null}
            onDrop={!isMobile ? handleDrop : null}
            onDragOver={!isMobile ? (e) => e.preventDefault() : null}
          >
            <span className="mb-3">
              <svg
                width="29"
                height="32"
                viewBox="0 0 29 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.6875 24V7.7L7.975 12.9L5.4375 10L14.5 0L23.5625 10L21.025 12.9L16.3125 7.7V24H12.6875ZM3.625 32C2.62812 32 1.77504 31.6087 1.06575 30.826C0.356458 30.0433 0.00120833 29.1013 0 28V22H3.625V28H25.375V22H29V28C29 29.1 28.6454 30.042 27.9361 30.826C27.2268 31.61 26.3731 32.0013 25.375 32H3.625Z"
                  fill="#D59615"
                />
              </svg>
            </span>
            {dragActive ? "Drop Images Here" : isMobile ? "Tap to Upload Images" : "Upload Images"}
          </label>
        </div>
      </div>

      <div className="col-md-6">
        {/* Preview Section */}
        {values[name] && values[name].length > 0 && (
          <div className="file-previews">
            <div className="row">
              {values[name].map((file, index) => {
                // Check if it's a newly uploaded file or a preloaded image object
                const filePreviewUrl =
                  file instanceof File
                    ? URL.createObjectURL(file) // New file (uploaded by user)
                    : `${baseURL}/${file.img_files}`; // Preloaded file from database

                return (
                  <div className="col-md-6 mb-3" key={index}>
                    <div className="file-preview d-flex justify-content-between align-items-center border-rounded-gray px-3 py-2 mb-2">
                      <div className="d-inline-flex align-items-center gap-3">
                        <Image
                          src={filePreviewUrl}
                          zoomSrc={filePreviewUrl}
                          alt="Uploaded File"
                          width="80"
                          height="60"
                          preview
                        />
                        {/* Use the name or id from the file object for display */}
                        <span>{file.name || file.img_files}</span>
                      </div>
                      <div>
                        <RxCross2
                          color="red"
                          size={25}
                          onClick={() => removeFile(file)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
