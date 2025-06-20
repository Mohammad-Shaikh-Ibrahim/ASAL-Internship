import { useState, useRef, useContext } from 'react';
import { TasksContext } from './TasksContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook} from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

export default function Header() {
  const [inputValue, setInputValue] = useState('');
  const { addTask } = useContext(TasksContext);
  const dialogRef = useRef(null);


  function handleInputChange(e) {
    const { value } = e.target;
    const regex = /^[A-Za-z0-9\s\-_=+!@#$%^&*(){}[\]:;"'<>,.?/\\|`~]*$/;

    if (regex.test(value)) {
      setInputValue(value);
    }
  }

  function handleAddTask() {
    if (inputValue) {
      addTask(inputValue);
      setInputValue('');
      if (dialogRef.current) {
        dialogRef.current.showModal();
        setTimeout(() => {
          dialogRef.current.close();
        }, 3000);
      }
    }
  }

  return (
    <header className="mx-6 font-serif relative">
      <h1 className="text-center text-5xl my-12">To-Do Input</h1>
      <div className="rounded-md border-slate-500 border-2 mx-16 p-4">
        <div className="flex items-center mb-4 border-slate-300 border-2 rounded-md">
          <FontAwesomeIcon icon={faBook} className="bg-cyan-500 p-4 text-white" />
          <input
            className="flex-1 p-3 text-left w-full sm:w-auto"
            type="text"
            placeholder="New ToDo"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="w-full bg-cyan-500 text-white py-2 rounded-md text-xl border-2 border-cyan-500 hover:bg-white hover:text-cyan-500"
          onClick={handleAddTask}
        >
          Add New Task
        </button>
      </div>
      <dialog ref={dialogRef} className="rounded-md shadow-xl p-4 bg-green-500 text-white">
        <p className="bg-green-500 text-white text-4xl m-10">
          <FontAwesomeIcon className='mx-2' icon={faCircleCheck} />
          Task Added Successfully!
        </p>
      </dialog>

    </header>
  );
}
