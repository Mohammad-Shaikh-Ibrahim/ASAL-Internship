import { useContext, useRef, useState } from 'react';
import { TasksContext } from './TasksContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import toDoListImage from '../assets/toDoList_Icon.png';

export default function ToDoList() {
  const { tasks, toggleTaskCompletion, deleteTask, deleteDoneTasks, deleteAllTasks, updateTask } = useContext(TasksContext);
  const [filter, setFilter] = useState('all'); 
  const [taskToDelete, setTaskToDelete] = useState(null); 
  const [taskToEdit, setTaskToEdit] = useState(null); 
  const [newTaskText, setNewTaskText] = useState('');
  
  const deleteDoneDialogRef = useRef(null);
  const deleteAllDialogRef = useRef(null);
  const deleteTaskDialogRef = useRef(null);
  const editTaskDialogRef = useRef(null);

  const buttonClass = 'bg-green-500 text-white py-2 rounded-md text-lg w-80 border-2 border-green-500 hover:bg-white hover:text-green-500';

  const filteredTasks = tasks.filter(task => {
    if (filter === 'done') return task.completed;
    if (filter === 'todo') return !task.completed;
    return true;
  });

  function handleDeleteDoneTasks() {
    if (deleteDoneDialogRef.current) {
      deleteDoneDialogRef.current.showModal();
    }
  }

  function handleDeleteAllTasks() {
    if (deleteAllDialogRef.current) {
      deleteAllDialogRef.current.showModal();
    }
  }

  function handleDeleteTask(index) {
    setTaskToDelete(index);
    if (deleteTaskDialogRef.current) {
      deleteTaskDialogRef.current.showModal();
    }
  }

  function handleEditTask(index) {
    setTaskToEdit(index);
    setNewTaskText(tasks[index].text);
    if (editTaskDialogRef.current) {
      editTaskDialogRef.current.showModal();
    }
  }

  function confirmDeleteTask() {
    if (taskToDelete !== null) {
      deleteTask(taskToDelete);
      setTaskToDelete(null);
      if (deleteTaskDialogRef.current) {
        deleteTaskDialogRef.current.close();
      }
    }
  }

  function confirmDeleteDoneTasks() {
    deleteDoneTasks();
    if (deleteDoneDialogRef.current) {
      deleteDoneDialogRef.current.close();
    }
  }

  function confirmDeleteAllTasks() {
    deleteAllTasks();
    if (deleteAllDialogRef.current) {
      deleteAllDialogRef.current.close();
    }
  }

  function confirmEditTask() {
    if (taskToEdit !== null) {
      updateTask(taskToEdit, newTaskText);
      setTaskToEdit(null);
      setNewTaskText('');
      if (editTaskDialogRef.current) {
        editTaskDialogRef.current.close();
      }
    }
  }

  function handleCancelEdit() {
    setTaskToEdit(null);
    setNewTaskText('');
    if (editTaskDialogRef.current) {
      editTaskDialogRef.current.close();
    }
  }

  return (
    <section className="mx-6 font-serif my-5">
      <div className="rounded-md border-slate-500 border-2 mx-16 p-4">
        <h2 className="text-center text-3xl my-8">To-Do List</h2>
        <div className="flex justify-around mb-6">
          <button className={buttonClass} onClick={() => setFilter('all')}>All</button>
          <button className={buttonClass} onClick={() => setFilter('done')}>Done</button>
          <button className={buttonClass} onClick={() => setFilter('todo')}>To-Do</button>
        </div>
        <div>
          {filteredTasks.length === 0 ? (
            <div className="text-center my-8">
              <img src={toDoListImage} alt="No tasks" className="mx-auto my-4 opacity-70" />
              <p className="text-gray-700 font-mono">No tasks available. Add a new task to get started!</p>
            </div>
          ) : (
            <div>
              <ul>
                {filteredTasks.map((task, index) => (
                  <li key={index} className="flex items-center justify-between rounded-md border-slate-300 border-2 py-4 px-4 my-3">
                    <div className="flex items-center flex-1">
                      <span className={`flex-1 ${task.completed ? 'line-through text-red-500' : ''}`}>
                        {task.text}
                      </span>
                    </div>
                    <label className="custom-checkbox mr-4">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(index)}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <div className="flex items-center">
                      <button className="mr-3 text-yellow-500" onClick={() => handleEditTask(index)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(index)}
                        className="mr-3 text-red-600"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className='flex justify-around'>
                <button onClick={handleDeleteDoneTasks} className='bg-red-600 text-white py-2 rounded-md text-lg w-80 border-2 border-red-600 hover:bg-white hover:text-red-600'>Delete Done Tasks</button>
                <button onClick={handleDeleteAllTasks} className='bg-red-600 text-white py-2 rounded-md text-lg w-80 border-2 border-red-600 hover:bg-white hover:text-red-600'>Delete All Tasks</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <dialog ref={deleteDoneDialogRef} className="rounded-md shadow-xl p-4 bg-red-500 text-white">
        <p className="text-2xl mx-10 my-5">Are you sure you want to delete all completed tasks?</p>
        <div className="flex justify-end">
          <button className="bg-white text-red-500 py-2 px-4 rounded-md mr-4" onClick={() => deleteDoneDialogRef.current.close()}>Cancel</button>
          <button className="bg-red-700 text-white py-2 px-4 rounded-md mr-4" onClick={confirmDeleteDoneTasks}>Confirm</button>
        </div>
      </dialog>

      <dialog ref={deleteAllDialogRef} className="rounded-md shadow-xl p-4 bg-red-500 text-white">
        <p className="text-2xl mx-10 my-5">Are you sure you want to delete all tasks?</p>
        <div className="flex justify-end">
          <button className="bg-white text-red-500 py-2 px-4 rounded-md mr-4" onClick={() => deleteAllDialogRef.current.close()}>Cancel</button>
          <button className="bg-red-700 text-white py-2 px-4 rounded-md mr-4" onClick={confirmDeleteAllTasks}>Confirm</button>
        </div>
      </dialog>

     
      <dialog ref={deleteTaskDialogRef} className="rounded-md shadow-xl p-4 bg-red-500 text-white">
        <p className="text-2xl mx-10 my-5">Are you sure you want to delete this task?</p>
        <div className="flex justify-end">
          <button className="bg-white text-red-500 py-2 px-4 rounded-md mr-4" onClick={() => deleteTaskDialogRef.current.close()}>Cancel</button>
          <button className="bg-red-700 text-white py-2 px-4 rounded-md mr-4" onClick={confirmDeleteTask}>Confirm</button>
        </div>
      </dialog>

      
      <dialog ref={editTaskDialogRef} className="rounded-md shadow-xl p-4 bg-yellow-500 text-black">
        <p className="text-2xl mb-4 text-white">Edit Task</p>
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          className="w-full p-2 mb-4 rounded-md"
        />
        <div className="flex justify-between">
          <button className="bg-white text-yellow-500 py-2 px-4 rounded-md mr-8" onClick={handleCancelEdit}>Cancel</button>
          <button className="bg-yellow-700 text-white py-2 px-4 rounded-md " onClick={confirmEditTask}>Save Changes</button>
        </div>
      </dialog>
    </section>
  );
}
