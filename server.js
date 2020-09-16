const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./database.db');
const express = require('express');
const app = express ();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/tarefas', (req, resp) => {
    db.all('SELECT * FROM TAREFAS', (err, rows) => {
        resp.status(200).send(JSON.stringify({results: rows}));
    })
});

app.post('/tarefas', (req,resp) => {
    db.run(`INSERT INTO TAREFAS (titulo, descricao, status)
    VALUES (?, ?, ?)`, [req.body.titulo,
                        req.body.descricao,
                        req.body.status]);
    resp.status(200).send('Item inserido');
});

app.delete('/tarefas/:id', (req, resp) => {
    db.run(`DELETE FROM TAREFAS WHERE id=?`, [req.params.id])

    resp.send();
})

app.put('/tarefas/:id', (req, resp) => {
    db.run(`UPDATE TAREFAS SET titulo=?, descricao=?, status=? WHERE id=?`,
        [req.body.titulo, req.body.descricao, req.body.status, req.params.id])

    resp.send('Atualizado');
})

app.listen (8080, () => console.log ('Servidor inicializado'));

/* process.on('SIGINT', ()=> {
    db.close((err) => {
        console.log("Banco encerrado com sucesso!");
        process.exit(0);
    })
}) */