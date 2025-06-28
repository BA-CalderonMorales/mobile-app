import AsyncStorage from '@react-native-async-storage/async-storage';

export type StoredTodo = {
  id: string;
  text: string;
  completed: boolean;
};

const STORAGE_KEY = 'todos';
const FILTER_KEY = 'filter';

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

export const loadFilter = async (): Promise<'all' | 'active' | 'completed'> => {
  const value = await AsyncStorage.getItem(FILTER_KEY);
  if (value === 'active' || value === 'completed') {
    return value;
  }
  return 'all';
};

export const saveFilter = async (
  filter: 'all' | 'active' | 'completed'
): Promise<void> => {
  await AsyncStorage.setItem(FILTER_KEY, filter);
};
