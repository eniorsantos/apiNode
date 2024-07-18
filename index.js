import express, { request, response } from 'express';

const app = express();
app.use(express.json());

const pessoas = [
  {
    id: 123456,
    nome: 'Dede Santana',
  },
  {
    id: 56987,
    nome: 'Mussum',
  },
  {
    id: 78964,
    nome: 'Zacarias',
  },
];

app.get('/pessoas', (request, response) => {
  return response.status(200).json({ pessoas: pessoas });
});


app.get('/pessoas/:id', (request, response) => {

  const user = pessoas.find((pessoa) => String(pessoa.id) === String(request.params.id))

  return response.status(200).json({ user });
});


app.post('/pessoas', (request, response) => {
  const { nome, idade } = request.body;

  pessoas.push({
    nome: nome,
    idade: idade,
    id: Date.now(),
  });

  return response.status(201).json({ message: 'ok' });
});

app.put('/pessoas/:id', (request, response) => {
  console.log(request.params);

  const userID = pessoas.findIndex(
    pessoa => String(pessoa.id) === String(request.params.id)
  );

  console.log(userID);

  if (userID === -1) {
    return response.status(404).json({ message: 'Usuario não encontrado!' });
  }

  pessoas[userID].nome = request.body.nome;
  pessoas[userID].idade = request.body.idade;

  return response.status(200).json({ message: 'ok' });
});

app.delete('/pessoas/:id', (request, response) => {
  console.log(request.params);

  // const pessoasFiltrado = pessoas.filter((pessoa) => String(pessoa.id) != String(request.params.id));
  const userID = pessoas.findIndex(
    pessoa => String(pessoa.id) === String(request.params.id)
  );

  console.log(userID);

  if (userID === -1) {
    return response.status(404).json({ message: 'Usuario não encontrado!' });
  }

  delete pessoas[userID];
  // pessoas = pessoasFiltrado;
  return response.status(200).json({ message: 'ok' });
});


app.listen(3333, () => console.log('Executando'));
