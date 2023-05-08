import React, { useState,useEffect } from 'react';

const Imagefetch = () => {

  const[image, setImage] = useState([]);


  const getImage = async() => {
    const response = await fetch('http://localhost:8000/image', {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
          });
          const data = await response.json()
          setImage(data.image)
  }
  useEffect(() => {
    getImage();
  }, []);
  

  return (
    <div> 
      {image.map((image) => {
        return (
          <div key={image.id}>
        <img src={`http://localhost:8000/images/${image.image}`}
        style={{height: '100px'}}
        alt="pic" />
        </div>
        )
      })}
        
      
    </div>
  );
};

export default Imagefetch;
