import React, { useState } from 'react';
import DefaultImg from "../../../assests/default-logo4.png"

const ImageComponent = ({src, alt, className, srcset}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div>
      {imageError ? (
        <img src={DefaultImg} className={className} alt={alt}/>
      ) : (
        <img src={src} alt={alt} srcSet={srcset} className={className} onError={handleImageError} />
      )}
    </div>
  );
};

export default ImageComponent;
