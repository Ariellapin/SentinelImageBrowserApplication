import { useState, useEffect,useRef } from "react";
import SciHubAPI from "../Utils/API/ScihubAPI";
import {getImagesLinks} from '../Utils/XMLParser';
import {getRandomIndexes} from '../Utils/RandomIndex';


const useImages = (maxRecords) =>{
    const [images, setImages] = useState([]);
    const [searchImages, setSearcImages] = useState([]);
    const [randomIndexes, setRandomIndexes] = useState([]);
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
  
      const newRandomIndexes = getRandomIndexes(maxRecords,randomIndexes,[],0);
      console.log(`Next random indexes:${newRandomIndexes}`);
      const url1 = await api.getImage(searchedImages[newRandomIndexes[0]].url);
      const url2 = await api.getImage(searchedImages[newRandomIndexes[1]].url);

      const randomImages = [  
        {url:url1,brightness:`${brightness}%`},
        {url:url2,brightness:`${brightness}%`}];
  
      setRandomIndexes(newRandomIndexes);
      setImages(randomImages);
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