import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import Sidebar from "./components/Sidebar";
import Column from "./components/Column";
import { DndContext, closestCenter } from "@dnd-kit/core";

export default function App() {

  const [view, setView] = useState("board");

  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const [dark, setDark] = useState(false);

  // ✅ GET TOKEN
  const token = localStorage.getItem("token");

  // ✅ LOAD TASKS (WITH JWT)
  useEffect(() => {
    fetch("http://localhost:8080/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
      })
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
      })
      .catch((err) => {
        console.error("Error loading tasks:", err);
      });
  }, [token]);

  // ✅ ADD TASK
  const addTask = async (title, desc, priority, dueDate) => {
    try {
      const res = await fetch("http://localhost:8080/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    } catch (err) {
      console.error("Add task error:", err);
    }
  };

  // ✅ MOVE TASK
  const moveTask = async (task, from, to) => {
    const updated = { ...task, status: to };

    try {
      await fetch(`http://localhost:8080/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });

      setTasks((prev) => ({
        ...prev,
        [from]: prev[from].filter((t) => t.id !== task.id),
        [to]: [...prev[to], updated],
      }));
    } catch (err) {
      console.error("Move task error:", err);
    }
  };

  // ✅ DRAG HANDLER
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

  return (
    <div className={dark ? "dark" : ""}>
      <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition">

        {/* SIDEBAR */}
        <Sidebar view={view} setView={setView} />

        {/* MAIN */}
        <div className="flex-1 flex flex-col">

          <Header dark={dark} setDark={setDark} />

          <main className="flex-1 p-6 overflow-x-auto">

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