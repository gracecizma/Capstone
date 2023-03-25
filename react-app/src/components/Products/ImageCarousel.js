import React, { useState, useEffect } from 'react';

function ProductCarousel(props) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`/api/product/${props.productId}/images`)
      .then(response => response.json())
      .then(data => setImages(data));
  }, [props.productId]);

  return (
    <div className="product-carousel">
      {images.map((imageUrl, index) => (
        <img src={imageUrl} alt={`Image ${index}`} key={imageUrl} />
      ))}
    </div>
  );
}

export default ProductCarousel;
