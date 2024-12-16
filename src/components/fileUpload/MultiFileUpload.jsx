import React, { useState, useEffect } from "react";
import { Image } from "primereact/image";
import { RxCross2 } from "react-icons/rx";
import { SlPicture } from "react-icons/sl";


export default React.memo(function MultiFileUpload({ formik, name, baseURL }) {
  const { values, setFieldValue } = formik;
  const [dragActive, setDragActive] = useState(false);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Handle file input change
  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const validFiles = uploadedFiles.filter((file) => file instanceof File);
    setFieldValue(name, [...(values[name] || []), ...validFiles]);
  };

  // Handle drag and drop for desktop
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter((file) => file instanceof File);
    setFieldValue(name, [...(values[name] || []), ...validFiles]);
  };

  // Remove a specific file
  const removeFile = (fileToRemove) => {
    if (fileToRemove instanceof File) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    setFieldValue(
      name,
      values[name].filter((file) => file !== fileToRemove)
    );
  };

  useEffect(() => {
    return () => {
      if (values[name]) {
        values[name].forEach((file) => {
          if (file instanceof File) {
            URL.revokeObjectURL(file.preview);
          }
        });
      }
    };
  }, [values, name]);

  return (
    <div className="multipule-file-upload-wrapper row">
      {/* File Upload Area */}
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
            className={`multipule-image-uploader mb-4 ${dragActive ? "drag-active" : ""}`}
            onDragEnter={!isMobile ? handleDragEnter : null}
            onDragLeave={!isMobile ? handleDragLeave : null}
            onDrop={!isMobile ? handleDrop : null}
            onDragOver={!isMobile ? (e) => e.preventDefault() : null}
          >
            <span className="mb-3">
              <SlPicture color="#918E92" size={100}/>
            </span>
            {dragActive ? "Drop Images Here" : isMobile ? "Tap to Upload Images" : "Upload Images"}
            <span className="text-orange fw-500">Click to browse</span>
          </label>
        </div>
      </div>

      {/* Preview Section */}
      <div className="col-md-6">
        {/* Preview Section */}
        {Array.isArray(values[name]) && values[name].length > 0 && (
          <div className="file-previews ">
            <div className="multi-pre-list">
              {values[name].map((file, index) => {
                const filePreviewUrl = file instanceof File
                  ? URL.createObjectURL(file) // New file (uploaded by user)
                  : `${baseURL}/${file.img_files}`; // Preloaded file from database

                return (
                  <div className="grid-item" key={index}>
                    <div className="file-preview position-relative d-flex justify-content-between align-items-center border-rounded-gray px-3 py-2 mb-2">
                      <div className="h-100">
                        <Image
                          src={filePreviewUrl}
                          zoomSrc={filePreviewUrl}
                          alt="Uploaded File"
                          className="multi-file-preview"
                          preview
                        />
                        {/* <span>{file.name}</span> */}
                      </div>
                      <div className="position-absolute top-0 end-0">
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
