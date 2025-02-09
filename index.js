const express = require('express');
const conectarDB = require('./config/config');
const postsRoutes = require('./routes/posts');
require('dotenv').config();

const app = express();
app.use(express.json()); 


conectarDB();


app.use('/posts', postsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

if (require.main === module) {
    app.listen(5000, () => {
      console.log("Servidor corriendo en el puerto 5000");
    });
  }
  
  module.exports = app;  
  
