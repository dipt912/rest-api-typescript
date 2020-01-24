BEGIN TRANSACTION;


CREATE TABLE logins (
    id serial PRIMARY KEY,
    hash VARCHAR(100) NOT NULL,
    name VARCHAR(90),
    email VARCHAR(90)  UNIQUE NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    version integer
);

COMMIT;

