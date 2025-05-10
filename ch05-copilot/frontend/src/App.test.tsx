import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

const user = userEvent.setup()

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(document.body.innerHTML).toBeTruthy()
  })
})
it('displays "Optimize Prompt" text on the optimization button', () => {
  render(<App />);
  // 使用更宽松的选择器
  const optimizeButton = screen.getByRole('button', { name: /optimize/i });
  
  console.log(`期望: "Optimize Prompt", 实际: "${optimizeButton.textContent}"`);
  
  expect(optimizeButton.textContent).toBe('Optimize Prompt');
})
it('updates form state when user enters input', async () => {
  render(<App />);
  const roleInput = screen.getByPlaceholderText(/prompt optimization expert/i);
  
  await user.type(roleInput, 'Test Role');
  await user.click(screen.getByRole('button', { name: /optimize prompt/i }));
  
  expect(roleInput).toHaveValue('Test Role');
});

it('makes API call with correct payload when optimize button clicked', async () => {
  const mockFetch = vi.spyOn(global, 'fetch');
  render(<App />);
  
  await user.click(screen.getByRole('button', { name: /optimize prompt/i }));
  
  expect(mockFetch).toHaveBeenCalledWith(
    'http://localhost:3000/api/optimize',
    expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
  );
});

it('displays error message when API call fails', async () => {
  vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error());
  render(<App />);
  
  await user.click(screen.getByRole('button', { name: /optimize prompt/i }));
  
  expect(screen.getByText(/error: failed to optimize prompt/i)).toBeInTheDocument();
});

it('shows default message in prompt area on initial load', () => {
  render(<App />);
  
  expect(screen.getByText(/your optimized prompt will be displayed here/i)).toBeInTheDocument();
});

it('renders all RABPOC input field labels', () => {
  render(<App />);
  
  expect(screen.getByText(/r: what role/i)).toBeInTheDocument();
  expect(screen.getByText(/a: what audience/i)).toBeInTheDocument();
  expect(screen.getByText(/b: what boundary/i)).toBeInTheDocument();
  expect(screen.getByText(/p: what purpose/i)).toBeInTheDocument();
  expect(screen.getByText(/o: what output/i)).toBeInTheDocument();
  expect(screen.getByText(/c: what concern/i)).toBeInTheDocument();
});