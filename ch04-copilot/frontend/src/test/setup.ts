import { expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';

beforeEach(() => {
  render(<App />);
});

global.expect = expect;