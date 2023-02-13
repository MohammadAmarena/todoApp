import { useState } from 'react';
import {TodoForm} from './TodoForm';
import {Todo} from './Todo';

export const TodoList = () => {
  const [todos, setTodos] = useState<any>([]);

  const addTodo = (todo: { text: string; }) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos);
  };

  const updateTodo = (todoId: any, newValue: { text: string; }) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev: any[]) => prev.map((item: { id: number; })=> (item.id === todoId ? newValue : item)));
  };

  const removeTodo = (id: number) => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = (id: any) => {
    let updatedTodos = todos.map((todo: { id: number; isComplete: boolean; }) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} edit={{
        value: ''
      }} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}