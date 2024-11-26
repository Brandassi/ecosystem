use ecosystem;
create database ecosystem;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    score INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE ranking_eco (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada entrada
    name VARCHAR(100) NOT NULL,        -- Nome do jogador
    score INT NOT NULL,                -- Pontuação do jogador
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Data de inserção
);

CREATE TABLE ranking_prob (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada entrada
    name VARCHAR(100) NOT NULL,        -- Nome do jogador
    score INT NOT NULL,                -- Pontuação do jogador
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Data de inserção
);


drop table scores;
select * from ranking_eco;
select * from users;