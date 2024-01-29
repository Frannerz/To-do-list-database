const db = require("../database/db");
//CRUD- create, read, update, delete

//.run (if you don't need a result, e.g. for deleting a row)
// .get (if you expect a single row) 
//.all (if you want to get all rows matching a query)


//Function to create tasks

// use $content to insert variable/data from object in query 
const insert_task = db.prepare(/*sql*/`
    INSERT INTO tasks (content, complete) 
    VALUES ($content, $complete)
    RETURNING id, content, created_at
`);

function createTask(task) {
   return insert_task.get(task);
}

//example of task object: createTask({ content: "stuff done", complete: 1 });

//READ tasks

const select_tasks = db.prepare(/*sql*/ `
  SELECT 
  id,
  content,
  TIME(created_at) AS created_at,
  complete
FROM tasks
`);

function listTasks() {
  return select_tasks.all();
}

const taskList = listTasks();
console.log(taskList);

//DELETE tasks function

const delete_task = db.prepare(/*sql*/`
    DELETE FROM tasks WHERE id = ?
`);

function deleteTask(id) {
    delete_task.run(id);
}
// e.g. deleteTask(5)


//UPDATE tasks:
const update_task = db.prepare(/*sql*/ `
    UPDATE tasks
    SET content = $content
    WHERE id = $id
    RETURNING id, content, created_at, complete
`);

function editTask(task) {
    return update_task.get(task)
}

const update_complete = db.prepare(/*sql*/ `
    UPDATE tasks
    SET complete = NOT complete
    WHERE id = ?
    RETURNING id, content, created_at, complete
`);

function toggleTask(id){
    return update_complete.get(id);
}







module.exports = { 
    createTask: createTask, 
    deleteTask: deleteTask,
    listTasks: listTasks,
    editTask: editTask,
    toggleTask: toggleTask
};