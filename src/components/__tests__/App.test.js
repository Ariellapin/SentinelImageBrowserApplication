import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../App';

test('renders header', () => {
  render(<App />);
  const header = screen.getByText(/Copernicus images/i);
  expect(header).toBeInTheDocument();
});