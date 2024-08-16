import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

import "./slider.css";

const Slider = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchImages = async (num) => {
    try {
      setLoading(true);
      let response = await fetch(
        `https://picsum.photos/v2/list?page=${num}&limit=10`
      );
      response = await response.json();
      setImages(response);
      if (imageIndex) setImageIndex(0);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchImages(currentPage);
  }, [currentPage]);

  const handleNext = () => {
    setImageIndex((imageIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setImageIndex(imageIndex ? imageIndex - 1 : images.length - 1);
  };

  const getNewImages = () => {
    setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <div>
      <div className="slider">
        <div className="images-container sub-container">
          {images.map((item) => (
            <div
              className="image-container"
              key={item.id}
              style={{
                transform: `translateX(${-100 * (imageIndex - 1)}%)`,
                opacity: imageIndex,
              }}
            >
              <img src={item.download_url} alt={item.url} className="image" />
            </div>
          ))}
        </div>
        <div className="images-container">
          <button
            type="button"
            onClick={handlePrevious}
            style={{ left: "5px" }}
          >
            {"<"}
          </button>
          {images.map((item, index) => (
            <div
              className="image-container"
              key={item.id}
              style={{
                transform: `translateX(${-100 * imageIndex}%)`,
              }}
            >
              <img src={item.download_url} alt={item.url} className="image" />
            </div>
          ))}
          <button type="button" onClick={handleNext} style={{ right: "5px" }}>
            {">"}
          </button>
          <div className="bottom-bar">
            {[...new Array(images.length)].map((item, index) => (
              <div
                key={index}
                className={`bottom-item ${
                  index === imageIndex ? "active" : ""
                }`}
                onClick={() => setImageIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className="images-container sub-container">
          {images.map((item) => (
            <div
              className="image-container"
              key={item.id}
              style={{
                transform: `translateX(${-100 * (imageIndex + 1)}%)`,
                opacity: imageIndex < images.length - 1 ? 1 : 0,
              }}
            >
              <img src={item.download_url} alt={item.url} className="image" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <button
          type="button"
          disabled={loading}
          onClick={getNewImages}
          className="new-image-button"
        >
          Get New Images
        </button>
      </div>
    </div>
  );
};

export default Slider;
