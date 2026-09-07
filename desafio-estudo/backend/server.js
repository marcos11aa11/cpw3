const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const app = express();

app.use(express.urlencoded({ extended: true }));
// 1. Rota para carregar o formulário HTML na porta 3000
app.get('/', (req, res) => {
    // Aponta para o index.html dentro da pasta frontend
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 2. Rota POST para receber e salvar a anotação
app.post('/estudo', (req, res) => {
    const { materia, resumo } = req.body;
    const linha = `[${materia}]: ${resumo}\n`;
    fs.appendFileSync('diario.txt', linha, 'utf-8');
    // Redireciona para a tela do histórico
    res.redirect('/historico');
});

// 3. Rota GET para ler o arquivo e exibir o histórico
app.get('/historico', (req, res) => {
    if (!fs.existsSync('diario.txt')) {
        return res.send("Nenhuma anotação cadastrada ainda. <br><br><a href='/'>Criar primeira anotação</a>");
    }
    const conteudo = fs.readFileSync('diario.txt', 'utf-8');
    res.send(`
        <h1>Histórico de Estudos</h1>
        <pre>${conteudo}</pre>
        <a href="/">Enviar outra anotação</a>
    `);
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
