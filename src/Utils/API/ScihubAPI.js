
class SciHubAPI {
    constructor(numRecords){
        this.url = new URL(`https://scihub.copernicus.eu/dhus/search?start=0&rows=${numRecords}&q=footprint:"Intersects(POLYGON((35 29.4,34.2 31.3,35 33.1,35.6 33,35.6 32.6,35.5 32,35.5 31,35 30.4,35 29.4,35 29.4)))" AND cloudcoverpercentage:[0 TO 30] AND platformname:Sentinel-2`);
        
        const userName = process.env.REACT_APP_USER_NAME;
        const password = process.env.REACT_APP_USER_PASSWORD;
        if(!userName || !password){
            console.error('Can`t read credentials from enviroment file');
            return;
        }
           
        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa(userName + ":" + password));
        this.headers = headers;
    }
   
    
    async getImages () {
        if(!this.headers){
            console.error('User credentials not set');
            return;
        }
            
        const images = await fetch(this.url, {method:'GET',headers: this.headers});
        return images;
    };

    arrayBufferToBase64(buffer) {
        return btoa(String.fromCharCode(...new Uint8Array(buffer)));
    };

    async getImage (url) {
        if(!this.headers){
            console.error('User credentials not set');
            return;
        }
        try{
            const response = await fetch(url, {method:'GET',headers: this.headers});
            const binaryData = await response.arrayBuffer();
            const base64 = this.arrayBufferToBase64(binaryData);
            return `data:image/png;base64,${base64}`;
        }
        catch(e){
            console.error(e);
            return "data:image/png;base64,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";
        }
        
    };

    
  };


export default SciHubAPI;