import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [undo, setUndo] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  const handleAdd = () => {
    if (todo.trim()) {
      const newTodos = [...todos, { text: todo, isCompleted: false }];
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
      setTodo("");
    }
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setUndo({ index, removedTodo: todos[index] });
    setTimeout(() => setUndo(null), 3000);
  };

  const handleEditStart = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditSave = (index) => {
    const newTodos = [...todos];
    newTodos[index].text = editText;
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setEditIndex(null);
    setEditText("");
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const handleUndo = () => {
    if (undo) {
      const newTodos = [...todos, undo.removedTodo];
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
      setUndo(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-4 p-6 rounded-lg bg-gray-100 shadow-lg min-h-screen">
        <div className="addToDo mb-6">
          <h2 className='text-3xl font-semibold text-gray-800 mb-4'>Add Todo</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your todo here..."
            />
            <button onClick={handleAdd} className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-8 focus:ring-blue-500">
              Add
            </button>
          </div>
        </div>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Your Todos</h2>
        <div className="todos grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {todos.map((item, index) => (
            <div key={index} className={`todo p-5 bg-white rounded-lg shadow-md ${item.isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {editIndex === index ? (
                <div>
                  <textarea
                    value={editText}
                    onChange={handleEditChange}
                    className="w-full p-4 h-52 border border-gray-300 rounded-lg shadow-md resize-none"
                  />
                  <button onClick={() => handleEditSave(index)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text text-base mb-5">{item.text}</div>
                  <div className="buttons flex space-x-2">
                    <button onClick={() => toggleComplete(index)} className="bg-green-500 text-white px-4 py-1 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
                      {item.isCompleted ? 'Undo' : 'Complete'}
                    </button>
                    <button onClick={() => handleEditStart(index)} className="bg-yellow-500 text-white px-4 py-1 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-4 py-1 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {undo && (
          <div className="undo-notification mt-4 p-4 bg-gray-200 text-gray-800 rounded-lg shadow-md">
            <p className="text-base">Todo deleted. <button onClick={handleUndo} className="text-blue-500 hover:underline">Undo</button></p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;