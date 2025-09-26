import React from 'react';
import { render, screen } from '@testing-library/react-native';
import UsersListScreen from '../screens/Users/UsersListScreen';

jest.mock('../hooks/useUsers', () => ({
  useUsers: jest.fn(() => ({
    data: [],
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  })),
}));

describe('UsersListScreen', () => {
  it('muestra texto vacío si no hay usuarios', () => {
    const mockNavigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
      dispatch: jest.fn(),
      setOptions: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      canGoBack: jest.fn(),
      isFocused: jest.fn(),
    } as any;

    const mockRoute = {
      key: 'UsersList',
      name: 'UsersList',
      params: {},
    } as any;

    render(<UsersListScreen navigation={mockNavigation} route={mockRoute} />);
    expect(screen.getByText(/No hay usuarios/i)).toBeTruthy();
  });
});
