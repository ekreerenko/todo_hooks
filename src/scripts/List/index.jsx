import React, { useState, useCallback, Fragment } from 'react';

import styles from './index.css';

const TodoList = () => {

  const [title, setTodoTitle] = useState('');
  const [todoList, setTodoList] = useState(['123', '456']);

  const handleChange = useCallback(event => setTodoTitle(event.target.value), []);

  const addTodo = useCallback(() => {
    console.log('todoList', todoList);
    setTodoList(todoList => [...todoList, title]);
    setTodoTitle('');
  }, [title]);

  const deleteTodo = useCallback(title => {
    console.log('id', title);
    setTodoList(list => list.filter((item, index) => `${item}${index}` !== title))
  }, []);

  console.log('todoList on Render', todoList);

  return (
    <div className={styles.container}>
      <input name="title" type="text" value={title} onChange={handleChange} />
      <button onClick={addTodo}>add todo</button>
      {todoList.map((item, index) => (
        <Fragment key={`${item}${index}`}>
          <div >{item}</div>
          <button onClick={() => deleteTodo(`${item}${index}`)}>delete todo</button>
        </Fragment>
      ))}
    </div>
  )

};

export default React.memo(TodoList);
