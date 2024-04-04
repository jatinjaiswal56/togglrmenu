import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css'

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async () => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: newTodo,
        completed: false,
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, updatedTodo);
      const updatedTodos = todos.map(todo => (todo.id === id ? response.data : todo));
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="todo-container">
    <h2>Todo List</h2>
    <div className="add-todo-form">
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="Enter new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleUpdateTodo(todo.id, { ...todo, completed: !todo.completed })}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', flex: 1 }}>{todo.title}</span>
          <button onClick={() => handleDeleteTodo(todo.id)} className="delete-button">Delete</button>
        </li>
      ))}
    </ul>
  </div>
);
};

export default TodoList;