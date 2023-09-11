import { act, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import useImages from '../useImages';
import ScihubAPI from '../../Utils/API/ScihubAPI';

jest.mock('../../Utils/API/ScihubAPI');

describe('useImages custom hook', () => {
  it('starts with default state', async () => {
    // Create a mock to simulate your asynchronous behavior
    ScihubAPI.mockImplementation(() => ({
      getImages: jest.fn().mockResolvedValue({ text: jest.fn().mockResolvedValue('xml data') }),
      getImage: jest.fn().mockResolvedValue("url data")
    }));

    const TestComponent = () => {
      const [isLoading, searchImages, images, renderBrigtness, loadImages] = useImages(20);
      return (
        <div>
          <div data-testid="loading">{isLoading.toString()}</div>
          <div data-testid="searchImages">{JSON.stringify(searchImages)}</div>
          <div data-testid="images">{JSON.stringify(images)}</div>
        </div>
      );
    };

    // Use the async version of act to apply resolved promises
    await act(async () => {
      render(<TestComponent />);
      // flush all JavaScript micro-tasks queue
      await Promise.resolve();
    });

    // Now assert your expectations
    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('true');
      expect(screen.getByTestId('searchImages').textContent).toBe('[]');
      expect(screen.getByTestId('images').textContent).toBe('[]');
    });
  });


  it('should call ScihubAPI.getImages and load images', async () => {

    const maxRecords = 20;

    ScihubAPI.mockImplementation(() => ({
      getImages: jest.fn().mockResolvedValue({ text: jest.fn().mockResolvedValue('xml data') }),
      getImage: jest.fn().mockResolvedValue("url data")
    }));

    const TestComponent = () => {
      const [isLoading, searchImages, images, renderBrigtness, load] = useImages(20);
      loadImages = load;  // Save loadImages in an outer variable
      return null;  // Render nothing
    };
    
    await act(async () => {
      render(<TestComponent />);
      await Promise.resolve();  // flush all JavaScript micro-tasks queue
    });

    expect(ScihubAPI).toHaveBeenCalledTimes(2);
    expect(ScihubAPI.prototype.constructor).toHaveBeenCalledWith(maxRecords);

  });
});