const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database");

const app = express();
const PORT = 3000;
const SECRET_KEY = "sua_chave_secreta";

app.use(cors());
app.use(bodyParser.json());

// Rota de cadastro de usuário
app.post("/api/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: "Usuário já existe!" });
                }
                return res.status(500).json({ message: "Erro ao cadastrar usuário!" });
            }
            res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao cadastrar!" });
    }
});

// Rota de login
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
            res.json({ token });
        } else {
            res.status(401).json({ message: "Credenciais inválidas" });
        }
    });
});



// Rota protegida: Bem-vindo
app.get("/api/welcome", authenticateToken, (req, res) => {
    res.json({ message: `Bem-vindo, ${req.user.username}!` });
});

app.post("/api/verify-token", authenticateToken, (req, res) => {
    res.status(200).json({ message: "Token válido." });
  });
  
  function authenticateToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Token necessário" });
  
    jwt.verify(token.split(" ")[1], SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: "Token inválido" });
      req.user = user;
      next();
    });
  }
  

// Rota para salvar a pontuação
app.post("/api/save-score", authenticateToken, (req, res) => {
    const { score } = req.body; // Pontuação enviada no corpo da requisição
    const userId = req.user.id; // `user.id` obtido do token JWT

    // Insere a pontuação no banco de dados
    db.query("INSERT INTO scores (user_id, score) VALUES (?, ?)", [userId, score], (err) => {
        if (err) {
            console.error("Erro ao salvar pontuação:", err);
            return res.status(500).json({ message: "Erro ao salvar pontuação!" });
        }
        res.status(200).json({ message: "Pontuação salva com sucesso!" });
    });
});

// Rota para obter o ranking
app.get("/api/ranking", authenticateToken, (req, res) => {
    const query = `
        SELECT 
            DENSE_RANK() OVER (ORDER BY scores.score DESC) AS position,
            users.username,
            scores.score
        FROM scores
        JOIN users ON scores.user_id = users.id
        ORDER BY position ASC, scores.score DESC;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao buscar o ranking:", err);
            return res.status(500).json({ message: "Erro ao buscar o ranking" });
        }
        res.status(200).json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
