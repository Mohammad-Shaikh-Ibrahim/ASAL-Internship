import { useState, useEffect } from 'react';
import { TasksProvider } from "./components/TasksContext.jsx";
import Header from "./components/Header.jsx";
import ToDoList from "./components/ToDoList.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <TasksProvider>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <button
          onClick={handleThemeSwitch}
          className="fixed top-4 right-4 w-12 h-12 dark:bg-white dark:text-black bg-black text-white rounded-full flex items-center justify-center shadow-lg z-10"
        >
          <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
        </button>
        <div className="flex flex-col ">
          <Header />
          <ToDoList />
        </div>
      </div>
    </TasksProvider>
  );
}

export default App;
