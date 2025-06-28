import AsyncStorage from '@react-native-async-storage/async-storage';

export type StoredTodo = {
  id: string;
  text: string;
  completed: boolean;
};

const STORAGE_KEY = 'todos';

export const loadTodos = async (): Promise<StoredTodo[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as StoredTodo[];
  } catch {
    return [];
  }
};

export const saveTodos = async (todos: StoredTodo[]): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};
