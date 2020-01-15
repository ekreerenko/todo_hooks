import React from 'react';

const Item = ({item, index, deleteTodo}) => {
  console.log('item ', item);
  return (
    <>
      <div >{item.title}</div>
      <button onClick={() => deleteTodo(`${item.title}${index}`)}>delete todo</button>
    </>
  )
};

export default React.memo(Item, (props, prevProps) => !Object.is(props, prevProps));
