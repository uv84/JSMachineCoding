import { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Style constants for better maintainability
const TODO_STYLES = {
  completed: {
    textDecoration: "line-through" as const,
    opacity: 0.6,
  },
  normal: {
    textDecoration: "none" as const,
    opacity: 1,
  }
} as const;

// LocalStorage utility functions
const STORAGE_KEY = "todoapp-todos";

const saveToLocalStorage = (todos: Todo[]) => {
  try {
    const dataToSave = JSON.stringify(todos);
    sessionStorage.setItem(STORAGE_KEY, dataToSave); 
  } catch (error) {
    console.error("❌ Failed to save todos to localStorage:", error);
  }
};

const loadFromLocalStorage = (): Todo[] => {
  try {
    const storedTodos = sessionStorage.getItem(STORAGE_KEY);
    if (storedTodos) {
      const parsed = JSON.parse(storedTodos);
      console.log(parsed)
      return parsed;
    } else {
      console.log("📝 No todos found in localStorage, starting fresh");
      return [];
    }
  } catch (error) {
    console.error("❌ Failed to load todos from localStorage:", error);
    return [];
  }
};

function TodoSession() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Initialize state with localStorage data
    return loadFromLocalStorage();
  });
  
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(0);

  // Save todos to localStorage whenever todos array changes
  useEffect(() => {
    saveToLocalStorage(todos);
  }, [todos]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setValue(newValue);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if (isEditing) {
        handleSubmit();
      } else {
        handleAdd();
      }
    }
  }

  function handleAdd() {
    if (value.trim() === "") {
      alert("Please enter a todo item");
      return;
    }

    const id = Date.now() + Math.random();
    const newTodo: Todo = {
      id,
      text: value.trim(),
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setValue("");
  }

  function clearAllTodos() {
    if (window.confirm("Are you sure you want to delete all todos?")) {
      setTodos([]);
    }
  }

  function exportTodos() {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'todos-backup.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  function debugLocalStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    console.log("🔍 Current localStorage content:", stored);
    alert(`LocalStorage Debug:\nKey: ${STORAGE_KEY}\nData: ${stored || 'No data found'}`);
  }

  function handleEdit(idx: number) {
    setValue("");
    const todoToEdit = todos.find((todo) => todo.id === idx);
    if (!todoToEdit) {
      console.error("Todo not found");
      return;
    }
    setIsEditing(true);
    setEditId(idx);
    setValue(todoToEdit.text);
  }
  function handleCancel() {
    setIsEditing(false);
    setValue("");
  }

  function handleSubmit() {
    if (value.trim() === "") {
      alert("Please enter a todo item");
      return;
    }
    setTodos((prev) =>
      prev.map((todo) => (todo.id === editId ? { ...todo, text: value.trim() } : todo))
    );
    setIsEditing(false);
    setValue("");
  }
  function handleDelete(idx: number) {
    setTodos((prev) => prev.filter((todo) => todo.id !== idx));
  }
  function handledone(id: number) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }
  return (
    <div>
      <h1>Todo Application (LocalStorage)</h1>
      <div>
        {isEditing ? (
          <>
            <input
              type="text"
              placeholder="Please Enter todo"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              aria-label="Edit todo item"
              autoFocus
            />
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSubmit}>Submit</button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Please Enter todo"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              aria-label="Add new todo item"
            />
            <button onClick={handleAdd}>➕ Add todo</button>
            {todos.length > 0 && (
              <>
                <button 
                  onClick={clearAllTodos}
                  style={{ marginLeft: '10px', backgroundColor: '#ff4444', color: 'white' }}
                  aria-label="Clear all todos"
                >
                  🗑️ Clear All
                </button>
                <button 
                  onClick={exportTodos}
                  style={{ marginLeft: '10px', backgroundColor: '#4CAF50', color: 'white' }}
                  aria-label="Export todos as JSON"
                >
                  📥 Export
                </button>
                <button 
                  onClick={debugLocalStorage}
                  style={{ marginLeft: '10px', backgroundColor: '#2196F3', color: 'white' }}
                  aria-label="Debug localStorage"
                >
                  🔍 Debug
                </button>
              </>
            )}
          </>
        )}
      </div>
      {todos.length === 0 ? (
        <p>No todos yet. Add one above! 📝</p>
      ) : (
        <div>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}
          </p>
          {todos.map((todo) => (
          <div key={todo.id}>
            <p
              style={todo.completed ? TODO_STYLES.completed : TODO_STYLES.normal}
            >
              {todo.text}{" "}
              <button 
                onClick={() => handleEdit(todo.id)}
                aria-label={`Edit todo: ${todo.text}`}
              >
                ✏️
              </button>
              <button 
                onClick={() => handleDelete(todo.id)}
                aria-label={`Delete todo: ${todo.text}`}
              >
                ❌
              </button>
              <button 
                onClick={() => handledone(todo.id)}
                aria-label={`Mark todo as ${todo.completed ? 'incomplete' : 'complete'}: ${todo.text}`}
              >
                {todo.completed ? "↩️" : "✅"}
              </button>
            </p>
          </div>
        ))}
        </div>
      )}
    </div>
  );
}

export default TodoSession;
