// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Validación: el título es obligatorio
    },
    body: {
      type: String,
      required: true, // Validación: el cuerpo es obligatorio
    },
  },
  { timestamps: true } // Esto crea automáticamente los campos "createdAt" y "updatedAt"
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
