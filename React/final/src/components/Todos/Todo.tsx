import { useState } from "react";

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

function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(0);

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
      text: value,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setValue("");
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
      <h1>Todo Application</h1>
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
              autoFocus
            />
            <button onClick={handleAdd}>➕ Add todo</button>
          </>
        )}
      </div>
      {todos.length === 0 ? (
        <p>please create Todos</p>
      ) : (
        todos.map((todo) => (
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
        ))
      )}
    </div>
  );
}

export default Todo;
