DROP DATABASE IF EXISTS capstone_blog;

CREATE DATABASE capstone_blog;
\C capstone_blog;
-- Create the referenced table first
CREATE TABLE users (
    id SERIAL PRIMARY KEY,     -- Ensure the column you're referencing exists
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(300) NOT NULL
);


CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT,
    img BYTEA,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

