import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ExampleComponent = () => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios({
        method: 'get',
        url: '../api/constituency',
        headers: {
          text: 'Es fliegen die Vögel über den Stock!',
        },
      });
      scss;
      const imageData = `data:image/png;base64, ${response.data}`;
      setImage(imageData);
    };
    fetchData();
  }, []);
  return (
    <div>
      {image && <img src={image} alt="constituency parsing visualization" />}
    </div>
  );
};
export default ExampleComponent;
