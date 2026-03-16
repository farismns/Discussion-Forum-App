import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import LoginInput from './LoginInput';

// Creating a dummy mock store to satisfy react-redux Provider
const mockStore = configureStore({
  reducer: {
    auth: (state = { authUser: null }) => state,
  },
});

const meta = {
  title: 'Components/LoginInput',
  component: LoginInput,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

export const Default = {};
