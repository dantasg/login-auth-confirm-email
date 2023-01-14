require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Conexão ao Bd
const conn = require('./db/conn');

const app = express();
const port = process.env.PORT;

// Config json response
app.use(express.json());

// Salve cors
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  }),
);

const UserRouter = require('./routes/UserRouter');
app.use('/user', UserRouter);

app.get('/', (req, res) => {
  res.send('Olá mundo!');
});

app.listen(process.env.PORT, () => {
  console.log('Servidor rodando!');
  console.log('http://localhost:3000');
});
