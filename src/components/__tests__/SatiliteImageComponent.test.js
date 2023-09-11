import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';  
import SatelliteImageComponent from '../SatelliteImageComponent';  

describe('SatiliteImageComponent', () => {

  it('should render an image with the correct URL and brightness', () => {
    const mockImageProps = {
      url: 'https://example.com/image.png',
      brightness: 50
    };

    const { getByRole } = render(<SatelliteImageComponent image={mockImageProps} />);
    
    const imgElement = getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'https://example.com/image.png');
    expect(imgElement).toHaveStyle({ filter: 'brightness(50)' });
  });

  it('should have a specific className', () => {
    const mockImageProps = {
      url: 'https://example.com/image.png',
      brightness: 50
    };

    const { getByRole } = render(<SatelliteImageComponent image={mockImageProps} />);
    
    const imgElement = getByRole('img');
    expect(imgElement).toHaveClass('ui big bordered image');
  });


});
