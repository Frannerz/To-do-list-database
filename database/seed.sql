BEGIN;

INSERT INTO tasks VALUES
    (1, 'Create my first todo', '2024-01-29 13:40:00', 1),
    (2, 'Buy milk', '2024-01-29 13:41:00', 1 ),
    (3, 'Do handstands', '2024-01-29 13:42:00', 0)
ON CONFLICT(id) DO NOTHING;

COMMIT;

