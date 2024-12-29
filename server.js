// Importación de dependencias necesarias
const express = require('express'); 
const logger = require('morgan'); 
const errorhandler = require('errorhandler'); 
const bodyParser = require('body-parser');

// Definición de la memoria como "base de datos" temporal
let store = {}; // Objeto que contiene datos en memoria
store.accounts = []; // Array para almacenar las cuentas

// Creación de la aplicación Express
let app = express();

// Middleware para parsear el cuerpo de las solicitudes en JSON
app.use(bodyParser.json());

// Middleware para registrar las solicitudes HTTP en la consola
app.use(logger('dev'));

// Middleware para manejar errores de manera más clara
app.use(errorhandler());

// Ruta para el endpoint raíz
app.get('/', (req, res) => {
  res.status(200).send('¡Bienvenido a la API REST! Usa /accounts para interactuar con las cuentas.');
});

// Ruta para obtener todas las cuentas
app.get('/accounts', (req, res) => {
  res.status(200).send(store.accounts);
});

// Ruta para crear una nueva cuenta
app.post('/accounts', (req, res) => {
  let newAccount = req.body; // Cuerpo de la solicitud contiene los datos de la nueva cuenta
  let id = store.accounts.length; // El ID es la posición del nuevo elemento en el array
  store.accounts.push(newAccount); // Se agrega la nueva cuenta al array
  res.status(201).send({ id: id }); // Devuelve el ID de la nueva cuenta creada
});

// Ruta para actualizar una cuenta existente por ID
app.put('/accounts/:id', (req, res) => {
  store.accounts[req.params.id] = req.body; // Actualiza la cuenta en la posición especificada
  res.status(200).send(store.accounts[req.params.id]); // Devuelve la cuenta actualizada
});

// Ruta para eliminar una cuenta por ID
app.delete('/accounts/:id', (req, res) => {
  store.accounts.splice(req.params.id, 1); // Elimina la cuenta en la posición especificada
  res.status(204).send(); // Código 204 indica éxito pero sin contenido
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

app.get('/accounts/:id', (req, res) => {
  let account = store.accounts[req.params.id];
  if (account) {
    res.status(200).send(account);
  } else {
    res.status(404).send({ error: 'Cuenta no encontrada' });
  }
});
