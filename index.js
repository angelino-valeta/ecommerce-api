const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Simulação de "banco de dados"
let clientes = [];
let produtos = [
  { id_produto: 1, nome: "Camiseta Básica", preco_base: 29.90, id_categoria: 1, ativo: true },
  { id_produto: 2, nome: "Tênis Esportivo", preco_base: 99.90, id_categoria: 2, ativo: true }
];
let categorias = [
  { id_categoria: 1, nome: "Roupas", descricao: "Vestuário em geral" },
  { id_categoria: 2, nome: "Calçados", descricao: "Sapatos e tênis" }
];

// GET /produtos - Listar produtos
app.get('/produtos', (req, res) => {
  res.status(200).json(produtos);
});

// GET /categorias - Listar gategorias
app.get('/categorias', (req, res) => {
  res.status(200).json(categorias)
})

// GET /produtos/:id - Detalhe de um produto
app.get('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id_produto === id);
  if (produto) {
    res.status(200).json(produto);
  } else {
    res.status(404).json({ mensagem: "Produto não encontrado" });
  }
});

// POST /clientes - Criar cliente
app.post('/clientes', (req, res) => {
  const novoCliente = {
    id_cliente: clientes.length + 1,
    nome: req.body.nome,
    email: req.body.email,
    senha_hash: "hash_temp", // Simulação
    cpf: req.body.cpf,
    data_nascimento: req.body.data_nascimento,
    telefone: req.body.telefone,
    data_cadastro: new Date(),
    status: "ativo",
    newsletter_opt_in: req.body.newsletter_opt_in || false
  };
  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});