
import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import 'vitest/globals';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
