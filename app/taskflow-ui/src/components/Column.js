import { useDroppable, useDraggable } from "@dnd-kit/core";

export default function Column({ title, tasks, moveTask, type }) {

  const { setNodeRef } = useDroppable({
    id: type,
  });

  return (
    <div
      ref={setNodeRef}
      className="w-80 bg-white/40 dark:bg-gray-800/60 backdrop-blur-lg p-4 rounded-2xl shadow-lg border border-white/20 transition hover:shadow-2xl"
    >
      
      <h2 className={`font-semibold mb-4 text-lg ${
        type === "todo"
          ? "text-blue-600"
          : type === "inProgress"
          ? "text-yellow-600"
          : "text-green-600"
     }`}>
        {title}
      </h2>

      <div className="space-y-3">
        {tasks.map((task) => (
          <DraggableTask key={task.id} task={task}>

            <div className="bg-white/90 dark:bg-gray-700/80 p-4 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200/50">

              {/* TITLE */}
              <p className="text-gray-800 dark:text-white font-semibold">
                {task.title}
              </p>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {task.description}
              </p>

              {/* PRIORITY + DATE */}
              <div className="flex justify-between items-center mt-2">

                {/* PRIORITY BADGE */}
                <span
                  className={`text-xs px-2 py-1 rounded font-medium ${
                    task.priority === "HIGH"
                      ? "bg-red-500 text-white"
                      : task.priority === "MEDIUM"
                      ? "bg-yellow-400 text-black"
                      : "bg-green-400 text-black"
                  }`}
                >
                  {task.priority}
                </span>

                {/* DUE DATE */}
                {task.dueDate && (
                  <span className="text-xs text-gray-500 dark:text-gray-300">
                    📅 {task.dueDate}
                  </span>
                )}

              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2 mt-3">

                {type !== "todo" && (
                  <button
                    onClick={() => moveTask(task, type, "todo")}
                    className="text-xs bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-lg hover:scale-105 transition"
                  >
                    ←
                  </button>
                )}

                {type !== "done" && (
                  <button
                    onClick={() =>
                      moveTask(
                        task,
                        type,
                        type === "todo" ? "inProgress" : "done"
                      )
                    }
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    →
                  </button>
                )}

              </div>

            </div>

          </DraggableTask>
        ))}
      </div>

    </div>
  );
}


// ✅ DRAGGABLE TASK
function DraggableTask({ task, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition: "transform 0.2s ease",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}