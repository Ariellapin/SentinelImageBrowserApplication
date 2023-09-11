import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import useImages from '../../hooks/useImages';
import SatiliteImageComponent from '../SatelliteImageComponent';
import SatiliteImagesComponent from '../SatelliteImagesComponent';


// Mocking the useImages custom hook
jest.mock('../../hooks/useImages', () => jest.fn());

// Mocking the SatiliteImageComponent
jest.mock('../SatelliteImageComponent', () => () => <div>SatiliteImageComponent</div>);

describe('SatiliteImagesComponent tests', () => {
  it('displays loading when images are being fetched',async () => {
    useImages.mockReturnValue([true, [], [], jest.fn(), jest.fn()]);
    render(<SatiliteImagesComponent />);

    expect(screen.getByText('Loading images ....')).toBeInTheDocument();
    
  });

  it('displays images and buttons when images are fetched', () => {
    useImages.mockReturnValue([
      false, 
      [],
      [{ url: 'url1', brightness: '100%' }, { url: 'url2', brightness: '100%' }],
      jest.fn(),
      jest.fn()
    ]);
    
    render(<SatiliteImagesComponent />);
    const images = screen.getAllByText('SatiliteImageComponent');
    expect(images[0]).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Brightness')).toBeInTheDocument();
  });

  it('calls loadImages when Next button is clicked', async () => {
    const mockLoadImages = jest.fn();
    useImages.mockReturnValue([false, [], [], jest.fn(), mockLoadImages]);
    
    render(<SatiliteImagesComponent />);
    
    fireEvent.click(screen.getByText('Next'));
    
    await waitFor(() => {
      expect(mockLoadImages).toHaveBeenCalled();
    });
  });

  it('calls renderBrigtness when Brightness button is clicked', () => {
    const mockRenderBrigtness = jest.fn();
    useImages.mockReturnValue([false, [], [], mockRenderBrigtness, jest.fn()]);
    
    render(<SatiliteImagesComponent />);
    
    fireEvent.click(screen.getByText('Brightness'));
    
    expect(mockRenderBrigtness).toHaveBeenCalled();
  });
});



