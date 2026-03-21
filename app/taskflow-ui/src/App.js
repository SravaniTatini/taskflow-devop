import Login from "./pages/Login";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import Sidebar from "./components/Sidebar";
import Column from "./components/Column";
import { DndContext, closestCenter } from "@dnd-kit/core";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [view, setView] = useState("board");

  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const [dark, setDark] = useState(false);

  // LOAD TASKS
  useEffect(() => {
    fetch("http://3.235.240.29:8080/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        const grouped = {
          todo: [],
          inProgress: [],
          done: [],
        };

        data.forEach((task) => {
          if (grouped[task.status]) {
            grouped[task.status].push(task);
          } else {
            grouped.todo.push(task);
          }
        });

        setTasks(grouped);
      });
  }, []);

  // ADD TASK
  const addTask = async (title, desc, priority, dueDate) => {
    const res = await fetch("http://3.235.240.29:8080/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description: desc,
        status: "todo",
        priority,
        dueDate,
      }),
    });

    const newTask = await res.json();

    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));
  };

  // MOVE TASK
  const moveTask = async (task, from, to) => {
    const updated = { ...task, status: to };

    await fetch(`http://3.235.240.29:8080/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    });

    setTasks((prev) => ({
      ...prev,
      [from]: prev[from].filter((t) => t.id !== task.id),
      [to]: [...prev[to], updated],
    }));
  };

  // DRAG
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const targetColumn = over.id;

    let sourceColumn = null;
    let taskObj = null;

    for (const key in tasks) {
      const found = tasks[key].find((t) => t.id === taskId);
      if (found) {
        sourceColumn = key;
        taskObj = found;
        break;
      }
    }

    if (sourceColumn && targetColumn && sourceColumn !== targetColumn) {
      moveTask(taskObj, sourceColumn, targetColumn);
    }
  };

  if (!loggedIn) {
  return <Login setLoggedIn={setLoggedIn} />;
  }

  return (
    <div className={dark ? "dark" : ""}>
      <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition">

        {/* ✅ FIXED: pass props */}
        <Sidebar view={view} setView={setView} />

        <div className="flex-1 flex flex-col">

          <Header dark={dark} setDark={setDark} />

          <main className="flex-1 p-6 overflow-x-auto">

            {/* ✅ CONDITIONAL RENDER INSIDE RETURN */}
            {view === "board" && (
              <>
                <TaskForm addTask={addTask} />

                <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex gap-6 mt-6">

                    <Column
                      title="To Do"
                      tasks={tasks.todo}
                      moveTask={moveTask}
                      type="todo"
                    />

                    <Column
                      title="In Progress"
                      tasks={tasks.inProgress}
                      moveTask={moveTask}
                      type="inProgress"
                    />

                    <Column
                      title="Done"
                      tasks={tasks.done}
                      moveTask={moveTask}
                      type="done"
                    />

                  </div>
                </DndContext>
              </>
            )}

            {view === "tasks" && (
              <div className="text-gray-800 dark:text-white">
                Task list view coming soon...
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
}