import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import {
  loadTodos,
  saveTodos,
  StoredTodo,
  loadFilter,
  saveFilter,
} from './TodoStorage';

type Todo = StoredTodo;

const createTodo = (text: string): Todo => ({
  id: Math.random().toString(36).slice(2),
  text,
  completed: false,
});

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    loadFilter().then(setFilter);
  }, []);

  useEffect(() => {
    loadTodos().then(setTodos);
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  useEffect(() => {
    saveFilter(filter);
  }, [filter]);

  const handleAdd = () => {
    if (text.trim().length === 0) return;
    setTodos([...todos, createTodo(text.trim())]);
    setText('');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo: Todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo: Todo) => !todo.completed));
  };

  const clearAll = () => {
    setTodos([]);
  };

  const completeAll = () => {
    setTodos(todos.map((todo: Todo) => ({ ...todo, completed: true })));
  };

  const startEdit = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    setEditingId(id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (!editingId) return;
    setTodos(
      todos.map((todo: Todo) =>
        todo.id === editingId ? { ...todo, text: editText } : todo
      )
    );
    setEditingId(null);
    setEditText('');
  };

  const filteredTodos = todos
    .filter((todo: Todo) => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .filter((todo: Todo) =>
      todo.text.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <View>
      <TextInput
        placeholder="Add new todo"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAdd}
      />
      <TextInput
        placeholder="Search todos"
        value={search}
        onChangeText={setSearch}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => setFilter('all')}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('active')}>
          <Text>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('completed')}>
          <Text>Completed</Text>
        </TouchableOpacity>
      </View>
      {filteredTodos.map((todo: Todo) => (
        <View key={todo.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
          {editingId === todo.id ? (
            <>
              <TextInput
                value={editText}
                onChangeText={setEditText}
                onSubmitEditing={saveEdit}
              />
              <TouchableOpacity onPress={saveEdit}>
                <Text>Save</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={() => toggleTodo(todo.id)}>
                <Text
                  style={{
                    textDecorationLine: todo.completed ? 'line-through' : 'none',
                  }}
                >
                  {todo.text}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeTodo(todo.id)}>
                <Text>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => startEdit(todo.id)}>
                <Text>Edit</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ))}
      <TouchableOpacity onPress={completeAll}>
        <Text>Complete All</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={clearCompleted}>
        <Text>Clear Completed</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={clearAll}>
        <Text>Clear All</Text>
      </TouchableOpacity>
      <Text testID="todo-count">
        {todos.filter((t) => !t.completed).length}{' '}
        {todos.filter((t) => !t.completed).length === 1 ? 'item' : 'items'} left
      </Text>
    </View>
  );
};
