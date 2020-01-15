import React, { useState, useCallback } from 'react';

import styles from './index.css';
import Item from "../Item";

const defaultList = [
  {
    title: '123',
    status: false,
  },
  {
    title: '456',
    status: false,
  }
];

const TodoList = () => {

  const [title, setTodoTitle] = useState('');
  const [todoList, setTodoList] = useState(defaultList);

  const handleChange = useCallback(event => setTodoTitle(event.target.value), []);

  const addTodo = useCallback(() => {
    setTodoTitle(prevTitle => {
      console.log('todoList', todoList);
      setTodoList(todoList => [...todoList, { title: prevTitle, status: false }]);
      return '';
    });
  }, []);

  const deleteTodo = useCallback(title => {
    console.log('id', title);
    setTodoList(list => list.filter((item, index) => `${item.title}${index}` !== title))
  }, []);

  console.log('todoList on Render', todoList);

  return (
    <div className={styles.container}>
      <input name="title" type="text" value={title} onChange={handleChange} />
      <button onClick={addTodo}>add todo</button>
      {todoList.map((item, index) => (
        <Item key={`${item.title}${index}`} item={item} index={index} deleteTodo={deleteTodo} />
      ))}
    </div>
  )

};

export default React.memo(TodoList);
