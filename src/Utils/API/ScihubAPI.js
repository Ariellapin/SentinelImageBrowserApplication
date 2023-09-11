
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
        const response = await fetch(url, {method:'GET',headers: this.headers});
        const binaryData = await response.arrayBuffer();
        const base64 = this.arrayBufferToBase64(binaryData);
        return `data:image/png;base64,${base64}`;
    };

    
  };


export default SciHubAPI;