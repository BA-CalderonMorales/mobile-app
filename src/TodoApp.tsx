import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const createTodo = (text: string): Todo => ({
  id: Math.random().toString(36).slice(2),
  text,
  completed: false,
});

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');

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

  return (
    <View>
      <TextInput
        placeholder="Add new todo"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAdd}
      />
      {todos.map((todo) => (
        <View key={todo.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
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
        </View>
      ))}
    </View>
  );
};
