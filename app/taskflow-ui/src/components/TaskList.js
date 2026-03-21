<div className="flex gap-6 mt-8 overflow-x-auto">

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