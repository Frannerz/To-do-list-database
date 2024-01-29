// to run in terminal: DB_FILE=db.sqlite node database/db.js 
//(replace db.sqlite with the db file name)

const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const Database = require("better-sqlite3");

const db = new Database(process.env.DB_FILE);

const schemaPath = join("database", "schema.sql");
const schema = readFileSync(schemaPath, "utf-8");
db.exec(schema);

// queries must be 'prepared' before they can be run
// can use queries over and over
const select_date = db.prepare("SELECT DATE()");
const date_result = select_date.get();
console.log(date_result);
//now use .run (if you don't need a result, e.g.
// for deleting a row), .get (if you expect a single
// row) and .all (if you want to get all rows matching a query)

//const select_table = db.prepare("SELECT name FROM sqlite_schema")
//const result = select_table.all();
//console.log(result)


module.exports = db; 