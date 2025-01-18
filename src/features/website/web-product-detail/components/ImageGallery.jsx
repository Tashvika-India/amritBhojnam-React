import React, { useState } from "react";

const ImageGallery = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="d-inline-flex gap-5 flex-wrap align-items-center">
      {images.map((image, index) => (
        <img
          key={index}
          src={image?.image}
          alt={image?.name}
          className="img-fluid border rounded"
          width="80"
          height="100"
          onClick={() => handleImageClick(image?.image)}
          style={{
            cursor: "pointer",
            width: "100px",
            height: "90px",
            objectFit: "cover",
            marginRight: "1.4rem",
          }}
        />
      ))}

      {/* Full-screen Modal */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <img
            src={selectedImage}
            alt="Full-screen review"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              border: "5px solid white",
              borderRadius: "10px",
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing modal on image click
          />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
