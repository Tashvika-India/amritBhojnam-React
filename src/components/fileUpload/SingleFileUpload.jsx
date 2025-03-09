import React, { useState, useEffect } from "react";
import { Image } from "primereact/image";
import { RxCross2 } from "react-icons/rx";
import { SlPicture } from "react-icons/sl";
import { singleImageUploadApi } from "../../services/adminApiRoutes";

export default React.memo(function SingleFileUpload({ formik, name, disabled,setPre, pre }) {
    const { values, setFieldValue } = formik;
    const [uploading, setUploading] = useState(false);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); 

    // Upload file to API
    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            setUploading(true);
            const response = await singleImageUploadApi(formData);
            const uploadedFile = response?.data; 
            const { image, img_name } = uploadedFile;
            setFieldValue("image", image);
            setFieldValue("img_name", img_name);
            setPre(image)
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setUploading(false);
        }
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file instanceof File) {
            uploadFile(file);
        }
    };

    // Remove file
    const removeFile = () => {
        if (!disabled) {
            setFieldValue(name, null); 
            setPre(null);  
        }
    };

    useEffect(() => {
        return () => {
            if (values[name] && values[name] instanceof File) {
                URL.revokeObjectURL(values[name].preview);
            }
        };
    }, [values, name]);

    return (
        <div className="multipule-file-upload-wrapper row" style={{ pointerEvents: disabled ? "none" : "auto", filter: disabled ? "grayscale(100%)" : "none" }}>
            {/* File Upload Area */}
            <div className="col-md-6">
                <div>
                    <input
                        type="file"
                        id="image"
                        hidden
                        onChange={handleFileChange}
                        disabled={disabled}
                    />
                    <label
                        htmlFor="image"
                        className="multipule-image-uploader mb-4"
                    >
                        <span className="mb-3">
                            <SlPicture color="#918E92" size={100} />
                        </span>
                        {isMobile ? "Tap to Upload Image" : "Upload Image"}
                        <span className="text-orange fw-500">Click to browse</span>
                    </label>
                </div>
                {uploading && <p>Uploading file...</p>}
            </div>

            {/* Preview Section */}
            <div className="col-md-6">
                {pre && (
                    <div className="file-previews">
                        <div className="multi-pre-list" style={{gridTemplateColumns: "none"}}>
                            <div className="grid-item">
                                <div className="file-preview position-relative d-flex justify-content-between align-items-center border-rounded-gray px-3 py-2 mb-2" style={{ cursor: disabled ? "pointer-none" : "pointer" }}>
                                    <div className="h-100">
                                        <Image
                                            src={pre}
                                            zoomSrc={pre}
                                            alt="Uploaded File"
                                            className="multi-file-preview"
                                            preview
                                        />
                                    </div>
                                    <div className="position-absolute top-0 end-0" style={{ pointerEvents: disabled ? "none" : "auto" }}>
                                        <RxCross2
                                            color="red"
                                            size={25}
                                            onClick={removeFile}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});
