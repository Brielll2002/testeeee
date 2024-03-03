const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql')
const cors = require('cors')

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chat',
})

app.listen(port, (err)=>{
    if(err){console.log(err)}
    console.log(`Servidor rodando na porta ${port}`)
})

app.use(cors())

app.get('/api/message', (req, res)=>{
    const sql = `SELECT * FROM message`

    conn.query(sql, (err, data)=>{
        if(err){
            console.log(err)
            res.status(500).json({message: '[ERRO] Dados não encontrados!'})
            return
        }
        const dados = data
        const messages = dados.map(message => ({
            id: message.id,
            name_user: message.name_user,
            key_user: message.key_user,
            message: message.message
        }))
        res.json(messages)
    })
})

app.post('/api/message', (req, res)=>{
    const name = req.body.name_user
    const key = req.body.key_user
    const message = req.body.message

    if(message != ''){
    const sql = `INSERT INTO message (name_user, key_user, message) VALUES ('${name}', '${key}', '${message}')`
    conn.query(sql, (err)=>{
        if(err){
            console.log(err)
        }
        console.log('Dados enviados com sucesso'.blue)
        res.json({
            message: 'Mensagem enviada com sucesso !'
        })
    })
    }
})