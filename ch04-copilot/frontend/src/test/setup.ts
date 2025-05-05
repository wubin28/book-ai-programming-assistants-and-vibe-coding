import { expect } from 'vitest';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../App';

beforeEach(() => {
  render(<App />);
});

global.expect = expect;