import ScihubAPI from '../API/ScihubAPI';  // replace with the actual path to your ScihubAPI class

describe('ScihubAPI', () => {
  

  process.env.REACT_APP_USER_NAME = 'testUser';
  process.env.REACT_APP_USER_PASSWORD = 'testPassword';
  
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      text: 'some xml'
    })
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should construct the object and set headers', () => {
    const api = new ScihubAPI(10);
    expect(decodeURI(api.url.toString())).toBe('https://scihub.copernicus.eu/dhus/search?start=0&rows=10&q=footprint:"Intersects(POLYGON((35 29.4,34.2 31.3,35 33.1,35.6 33,35.6 32.6,35.5 32,35.5 31,35 30.4,35 29.4,35 29.4)))" AND cloudcoverpercentage:[0 TO 30] AND platformname:Sentinel-2');
    expect(api.headers.get('Authorization')).toBe('Basic ' + btoa('testUser:testPassword'));
  });

  it('should fetch images', async () => {
    
    const api = new ScihubAPI(10);
    const response = await api.getImages();
    
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response).toEqual(expect.objectContaining({ text: "some xml" }));
  });

  it('should fetch and convert image to base64', async () => {
    const fakeBuffer = new ArrayBuffer(8);
    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockResolvedValue({
        arrayBuffer: jest.fn().mockResolvedValue(fakeBuffer)
      })
    
    const api = new ScihubAPI(10);
    const base64Image = await api.getImage('some-url');
    
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(base64Image).toBe(`data:image/png;base64,${api.arrayBufferToBase64(fakeBuffer)}`);
  });

});
