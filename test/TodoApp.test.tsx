import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
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

  it('clears completed todos', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<TodoApp />);

    const input = getByPlaceholderText('Add new todo');
    fireEvent.changeText(input, 'Task 1');
    fireEvent(input, 'submitEditing');

    fireEvent.changeText(input, 'Task 2');
    fireEvent(input, 'submitEditing');

    const item1 = getByText('Task 1');
    fireEvent.press(item1);

    const clearButton = getByText('Clear Completed');
    fireEvent.press(clearButton);

    expect(queryByText('Task 1')).toBeNull();
    expect(getByText('Task 2')).toBeTruthy();
  });

  it('edits an existing todo item', () => {
    const { getByPlaceholderText, getByText, getByDisplayValue, queryByText } =
      render(<TodoApp />);

    const input = getByPlaceholderText('Add new todo');
    fireEvent.changeText(input, 'Initial');
    fireEvent(input, 'submitEditing');

    const editButton = getByText('Edit');
    fireEvent.press(editButton);

    const editInput = getByDisplayValue('Initial');
    fireEvent.changeText(editInput, 'Updated');

    const saveButton = getByText('Save');
    fireEvent.press(saveButton);

    expect(getByText('Updated')).toBeTruthy();
    expect(queryByText('Initial')).toBeNull();
  });

  it('filters todos by status', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<TodoApp />);

    const input = getByPlaceholderText('Add new todo');
    fireEvent.changeText(input, 'Task 1');
    fireEvent(input, 'submitEditing');

    fireEvent.changeText(input, 'Task 2');
    fireEvent(input, 'submitEditing');

    const item1 = getByText('Task 1');
    fireEvent.press(item1); // complete Task 1

    const activeFilter = getByText('Active');
    fireEvent.press(activeFilter);

    expect(queryByText('Task 1')).toBeNull();
    expect(getByText('Task 2')).toBeTruthy();

    const completedFilter = getByText('Completed');
    fireEvent.press(completedFilter);

    expect(getByText('Task 1')).toBeTruthy();
    expect(queryByText('Task 2')).toBeNull();

    const allFilter = getByText('All');
    fireEvent.press(allFilter);

    expect(getByText('Task 1')).toBeTruthy();
    expect(getByText('Task 2')).toBeTruthy();
  });

  it('persists todos between sessions', async () => {
    const mockAsyncStorage = require('@react-native-async-storage/async-storage');
    mockAsyncStorage.getItem.mockResolvedValueOnce(null);

    const { getByPlaceholderText, unmount } = render(
      <TodoApp />
    );

    const input = getByPlaceholderText('Add new todo');
    fireEvent.changeText(input, 'Persisted');
    fireEvent(input, 'submitEditing');

    expect(mockAsyncStorage.setItem).toHaveBeenCalled();
    unmount();

    mockAsyncStorage.getItem.mockResolvedValueOnce(
      JSON.stringify([{ id: '1', text: 'Persisted', completed: false }])
    );
    const { findByText: findByTextAgain } = render(<TodoApp />);

    expect(await findByTextAgain('Persisted')).toBeTruthy();
  });
});
