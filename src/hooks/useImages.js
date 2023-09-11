import { useState, useEffect,useRef } from "react";
import SciHubAPI from "../Utils/API/ScihubAPI";
import {getImagesLinks} from '../Utils/XMLParser'

const useImages = (maxRecords) =>{
    const [images, setImages] = useState([]);
    const [searchImages, setSearcImages] = useState([]);
    const [showIndex, setShowIndex] = useState(0);
    const [brightness, setBrightness] = useState(100);
    const [isLoading,setLoading]= useState(true);
    const dataFetchedRef = useRef(false);
   
    const api = new SciHubAPI(maxRecords);
  
    const getSearchImages = async () =>{
      const response = await api.getImages();
      let xmldata = await response.text();
      const allImages = getImagesLinks(xmldata);
      await loadImages(allImages);
      setSearcImages(allImages);
    };
  
    const loadImages = async (searchedImages) =>{
      setLoading(true);
      if(searchedImages.length==0){
        return;
      }
  
      let newShowIndex = showIndex + 2;
      if(newShowIndex >= searchedImages.length - 1)
        newShowIndex = 0;
  
      const url1 = await api.getImage(searchedImages[newShowIndex].url);
      const url2 = await api.getImage(searchedImages[newShowIndex + 1].url);
      const randomImages = [  
        {url:url1,brightness:`${brightness}%`},
        {url:url2,brightness:`${brightness}%`}];
  
      setImages(randomImages);
      setShowIndex(newShowIndex);
      setLoading(false);
    };
  
    const renderBrigtness = () =>{
       const newBrigtness = brightness + 10;
       const brigterImages = images.map(image => {
          return {url:image.url,brightness:`${newBrigtness}%`};
       });
       
       setBrightness(newBrigtness);
       setImages(brigterImages);
    };
  
    useEffect(() => {
      if(dataFetchedRef.current)
        return;
  
      dataFetchedRef.current = true;
      getSearchImages()
        .catch(console.error);
      
    },[]);

    return [isLoading,searchImages,images,renderBrigtness,loadImages];
};

export default useImages;