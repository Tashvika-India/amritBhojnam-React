import React, { useState } from "react";
import { Image } from "primereact/image";
import { RxCross2 } from "react-icons/rx";
import { baseURL } from "../../utils/constant-variable";

export default function DraggableFileUpload({ formik, name }) {
  const { values, setFieldValue } = formik;
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFieldValue(name, uploadedFile);
    }
  };

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
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFieldValue(name, droppedFile);
    }
  };

  const removeFile = () => {
    setFieldValue(name, null);
  };

  return (
    <div className="file-upload-wrapper d-flex gap-3">
      <div className="w-75">
        <input type="file" id="image" hidden onChange={handleFileChange} />
        <label
          htmlFor="image"
          className={`image-uploader ${dragActive ? "drag-active" : ""}`}
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
          {dragActive ? "Drop Image Here" : "Upload Image"}
        </label>
      </div>

      {/* Preview Section */}
      {values[name] && (
        <div className="file-preview d-flex justify-content-between align-items-center border-rounded-gray px-3 py-2 position-relative" style={{width: "fit-content"}}>
          <div className="d-inline-flex align-items-center gap-3">
            <Image
              src={values[name] instanceof File ? URL.createObjectURL(values[name]) : `${baseURL}/${values[name]}` }
              zoomSrc={values[name] instanceof File ? URL.createObjectURL(values[name]) : `${baseURL}/${values[name]}` }
              alt="Uploaded File"
              width="100"
              height="auto"
              preview
            />
          </div>
          <div className="position-absolute top-0 end-0" style={{ cursor: "pointer", zIndex: "1" }}>
            <RxCross2
              color="red"
              size={25}
              onClick={removeFile}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
