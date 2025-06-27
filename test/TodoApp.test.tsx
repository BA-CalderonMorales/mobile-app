import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TodoApp } from '../src/TodoApp';

describe('TodoApp', () => {
  it('adds a new todo item', () => {
    const { getByPlaceholderText, getByText } = render(<TodoApp />);

    const input = getByPlaceholderText('Add new todo');
    fireEvent.changeText(input, 'Buy milk');
    fireEvent(input, 'submitEditing');

    expect(getByText('Buy milk')).toBeTruthy();
  });

  it('toggles a todo as completed', () => {
    const { getByPlaceholderText, getByText } = render(<TodoApp />);

    const input = getByPlaceholderText('Add new todo');
    fireEvent.changeText(input, 'Walk dog');
    fireEvent(input, 'submitEditing');

    const item = getByText('Walk dog');
    fireEvent.press(item);

    expect(item.props.style.textDecorationLine).toBe('line-through');
  });

  it('removes a todo item', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<TodoApp />);

    const input = getByPlaceholderText('Add new todo');
    fireEvent.changeText(input, 'Learn TDD');
    fireEvent(input, 'submitEditing');

    const removeButton = getByText('Delete');
    fireEvent.press(removeButton);

    expect(queryByText('Learn TDD')).toBeNull();
  });
});
