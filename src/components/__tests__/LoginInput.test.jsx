/**
 * LoginInput Component Test
 *
 * Skenario:
 * - should handle input typing (email and password)
 * - should submit form (calls dispatch)
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import LoginInput from '../LoginInput';

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    loading: vi.fn(() => 'toast-id'),
    success: vi.fn(),
    error: vi.fn(),
  },
}));

function createTestStore() {
  return createStore(() => ({
    auth: { authUser: null, isPreloading: false },
  }));
}

function renderLoginInput() {
  const store = createTestStore();
  store.dispatch = vi.fn(() => Promise.resolve());
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginInput />
        </MemoryRouter>
      </Provider>,
    ),
  };
}

describe('LoginInput component', () => {
  it('should handle input typing', async () => {
    renderLoginInput();

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('should submit form', async () => {
    const { store } = renderLoginInput();

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    await fireEvent.click(submitButton);

    // dispatch should have been called (for asyncLogin)
    expect(store.dispatch).toHaveBeenCalled();
  });
});
