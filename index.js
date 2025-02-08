// index.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/config');
const postRoutes = require('./routes/posts');

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Para poder leer los datos JSON enviados en el cuerpo de la solicitud

app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
