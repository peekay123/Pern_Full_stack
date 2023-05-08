
// //Front -end

import React, { useState } from 'react';

const UploadForm = () => {
  const [image, setImage] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Create FormData object
    const formData = new FormData();
    formData.append('image', image);

    // Send POST request to Node.js server
    try {
      const response = await fetch('http://localhost:8000/image', {
        method: 'POST',
        body: formData,
        // headers: {
        //   'Content-Type': "multipart/form-data"
        // }
      });

      // const data = await response.json();
      // console.log(data);

      // Handle response
      if (response.ok) {
        console.log('Image uploaded successfully!');
      } else {
        console.error('Failed to upload image.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlefile = (e) => {
    setImage(e.target.files[0]);
    // const reader = new FileReader();

    // reader.onloadend = () => {
    //   setImage(reader.result.toString());
    // }
    // reader.readAsDataURL(file);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="file" name= "image" onChange={handlefile} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;


