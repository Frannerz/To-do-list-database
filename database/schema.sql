BEGIN;

--create new table called 'tasks' if one does not exist--
--create 3 columns (id- automatically generated starting at 1, content- text input allowed, created_at- timestamp)--
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    complete INTEGER DEFAULT 0 CHECK(complete IN(0, 1))
);

--SQL does not support booleans (0 is false, 1 is true)--
COMMIT;

-- SQL transaction begins with BEGIN and ends with COMMIT--
--This prevents DB from getting into a broken state if something goes wrong--
