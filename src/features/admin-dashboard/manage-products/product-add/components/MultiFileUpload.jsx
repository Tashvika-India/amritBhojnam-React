import React, { useState } from "react";
import { Image } from "primereact/image";
import { RxCross2 } from "react-icons/rx";

export default function MultiFileUpload({ formik, name }) {
  const { values, setFieldValue } = formik;
  const [dragActive, setDragActive] = useState(false);

  // Handle file input change
  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFieldValue(name, [...(values[name] || []), ...uploadedFiles]); // Set Formik field value
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
    setFieldValue(name, [...(values[name] || []), ...droppedFiles]); // Set dropped files to Formik field
  };

  // Remove a specific file from the Formik values
  const removeFile = (fileToRemove) => {
    setFieldValue(
      name,
      values[name].filter((file) => file !== fileToRemove) // Remove the selected file from Formik state
    );
  };

  return (
    <div className="multipule-file-upload-wrapper row">
      {/* Drag and Drop Area */}
      <div className="col-md-6">
        <div>
          <input
            type="file"
            id="image"
            multiple // Enable multiple file selection
            hidden
            onChange={handleFileChange}
          />
          <label
            htmlFor="image"
            className={`multipule-image-uploader mb-4 ${dragActive ? "drag-active" : ""
              }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
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
            {dragActive ? "Drop Images Here" : "Upload Images"}
          </label>
        </div>
      </div>
      <div className="col-md-6">
        {/* Preview Section */}
        {values[name] && values[name].length > 0 && (
          <div className="file-previews">
            <div className="row">
              {values[name].map((file, index) => (
                <div className="col-md-6 mb-3">
                <div
                  key={index}
                  className="file-preview d-flex justify-content-between align-items-center border-rounded-gray px-3 py-2 mb-2"
                >
                  <div className="d-inline-flex align-items-center gap-3">
                    <Image
                      src={URL.createObjectURL(file)}
                      zoomSrc={URL.createObjectURL(file)}
                      alt="Uploaded File"
                      width="80"
                      height="60"
                      preview
                    />
                    <span>{file.name}</span>
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
