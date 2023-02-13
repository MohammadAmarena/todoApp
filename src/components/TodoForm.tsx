import { useState, useEffect, useRef, SetStateAction } from 'react';

export const TodoForm = (props: { edit: { value: string | (() => string); }; onSubmit: (arg0: { id: number; text: string; }) => void; }) => {
  const [input, setInput] = useState<string>(props.edit ? props.edit.value : '');

  const inputRef: any = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}