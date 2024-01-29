const test = require("node:test");
const assert = require("node:assert");
const model = require("../model/tasks.js");
const db = require("../database/db.js");

function reset() {
    db.exec(/*sql*/ `
    DELETE FROM tasks;
    DELETE FROM sqlite_sequence WHERE name='tasks';
    `);
}

test("can create, remove & list tasks", ()=> {
    reset();

    const task = model.createTask({content: "test task", complete: "0"});
    assert.equal(task.id, 1);
    assert.equal(task.content,"test task");

    model.deleteTask(task.id);
    const tasks = model.listTasks();
    assert.equal(tasks.length, 0);
});

test("can edit tasks", () => {
    reset();

    const task = model.createTask({content: "test edit function", complete: 0});
    const updated = model.editTask({ id: 1, content: "updated test task"});
    assert.equal(updated.id, 1);
    assert.equal(updated.content, "updated test task");
});


test("can mark as complete", () => {
    reset();

    const task = model.createTask({content: "complete test function", complete: 0});
    const updated = model.toggleTask(1);
    assert.equal(updated.id, 1);
    assert.equal(updated.complete, 1);
})
// Ideally our tests shouldn’t mess with our dev environment 
//(where we may have changes to the DB we don’t want to overwrite). 
//We can run the tests with a separate DB file by specifying 
//a different value for the env var:

// DB_FILE=test.sqlite node test/tasks.test.js


//It’s not necessary in this case, but if we wanted to seed the test DB 
//(so we can assert against the example data) we can tell 
//Node to require seed.js before running the test:

//DB_FILE=test.sqlite node -r ./database/seed.js test/tasks.test.js