

export const getImagesLinks = (xmlData) => {
    const xmlDoc = new DOMParser().parseFromString(xmlData, "text/xml");
     
    return [...xmlDoc.querySelectorAll("link[rel='icon']")].map(element=>{
        return {    
                   url:element.attributes['href'].nodeValue
               }
    });
};