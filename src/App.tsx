import React from 'react';
import ImageSlider from './ImageSlider';

interface Props {
  images: string[];
}

const App = () => {
  return (
    <div>
      <h2 style={{textAlign:"center", margin:"0px", color:"blue"}}>Gallery</h2>
    <ImageSlider />
    </div>
  );
};

export default App;

