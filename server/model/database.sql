DROP DATABASE IF EXISTS capstone_blog;
\c capstone_blog;

DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,     
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    img VARCHAR(200),
    password VARCHAR(300) NOT NULL
);


CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT,
    img VARCHAR(200),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

