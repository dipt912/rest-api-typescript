
BEGIN TRANSACTION;

CREATE TABLE users(
    id serial PRIMARY KEY,
    name VARCHAR(90),
    email  VARCHAR(90) UNIQUE NOT NULL,
    fname VARCHAR(90),
    lname VARCHAR(90),
    created_at timestamp ,
    updated_at timestamp,
    version integer
);

COMMIT;