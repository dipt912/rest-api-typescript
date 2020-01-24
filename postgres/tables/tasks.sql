BEGIN TRANSACTION;

CREATE TABLE tasks(
    id serial PRIMARY KEY,
    title VARCHAR(90),
    creator  VARCHAR(90),
    category VARCHAR(90),
    priority VARCHAR(20),
    description VARCHAR(500),
    assignie VARCHAR(50),
    created_at timestamp ,
    updated_at timestamp,
    version integer
);

COMMIT;