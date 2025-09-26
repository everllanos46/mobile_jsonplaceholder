import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TouchableOpacity, Text } from 'react-native';

function PostCard({ title, body, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
      <Text>{body}</Text>
    </TouchableOpacity>
  );
}

describe('PostCard', () => {
  it('renderiza título y body', () => {
    const { getByText } = render(
      <PostCard title="Hola" body="Cuerpo" onPress={() => {}} />
    );
    expect(getByText('Hola')).toBeTruthy();
    expect(getByText('Cuerpo')).toBeTruthy();
  });

  it('dispara onPress al tocar', () => {
    const mockFn = jest.fn();
    const { getByText } = render(
      <PostCard title="Hola" body="Cuerpo" onPress={mockFn} />
    );
    fireEvent.press(getByText('Hola'));
    expect(mockFn).toHaveBeenCalled();
  });
});
