import { getImagesLinks } from '../XMLParser';  

describe('getImagesLinks', () => {

  it('should parse XML and return image links', () => {
    // Mock DOMParser
    global.DOMParser = class {
      parseFromString(str) {
        const mockDoc = {
          querySelectorAll: jest.fn().mockImplementation((selector) => {
            if (selector === "link[rel='icon']") {
              return [{
                attributes: {
                  'href': {
                    nodeValue: 'https://example.com/icon1.png'
                  }
                }
              }, {
                attributes: {
                  'href': {
                    nodeValue: 'https://example.com/icon2.png'
                  }
                }
              }];
            }
            return [];
          })
        };
        return mockDoc;
      }
    };

    const xmlData = '<your xml data here>';
    const result = getImagesLinks(xmlData);

    expect(result).toEqual([
      { url: 'https://example.com/icon1.png' },
      { url: 'https://example.com/icon2.png' }
    ]);
  });

});