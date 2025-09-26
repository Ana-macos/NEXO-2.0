const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.json({ 
    message: 'Bem-vindo ao Nexo - Conectando pessoas através de eventos',
    version: '1.0.0'
  });
});

app.listen(PORT, () => {
  console.log(`Nexo rodando na porta ${PORT}`);
});