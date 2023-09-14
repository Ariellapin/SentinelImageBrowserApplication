import React from "react";
import SatelliteImageComponent from './SatelliteImageComponent';
import useImages from '../hooks/useImages'

const SatiliteImagesComponent = () => {
  const maxRecords = 50;
  const [isLoading,searchImages,images,renderBrigtness,loadImages] = useImages(maxRecords);

  const renderImages = images.map((image,idx)=>{
    return <SatelliteImageComponent key={idx} image={{url:image.url,brightness:image.brightness}} />;
  });

  return (
    <div className='ui '>
      <div className="ui images"> 
        { renderImages }
    </div>
      {isLoading ? (
        <h2 >Loading images ....</h2>
      ):(
        <>
        <button className='ui button blue' onClick={async() => await loadImages(searchImages) }>Next</button>
        <button className='ui button blue' onClick={ renderBrigtness }>Brightness</button>
        </>
      )}
    </div>
  );
};

export default SatiliteImagesComponent;
