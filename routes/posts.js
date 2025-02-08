// routes/posts.js
const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Crear una publicación
router.post('/create', async (req, res) => {
  const { title, body } = req.body;
  
  if (!title || !body) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  try {
    const post = new Post({ title, body });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener todas las publicaciones
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener publicación por ID
router.get('/id/:_id', async (req, res) => {
  const { _id } = req.params;
  try {
    const post = await Post.findById(_id);
    if (!post) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener publicación por título
router.get('/title/:title', async (req, res) => {
  const { title } = req.params;
  try {
    const posts = await Post.find({ title: new RegExp(title, 'i') });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar una publicación
router.put('/id/:_id', async (req, res) => {
  const { _id } = req.params;
  const { title, body } = req.body;
  
  if (!title || !body) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  try {
    const post = await Post.findByIdAndUpdate(
      _id,
      { title, body },
      { new: true } // Esto retorna el documento actualizado
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar una publicación
router.delete('/id/:_id', async (req, res) => {
  const { _id } = req.params;
  try {
    const post = await Post.findByIdAndDelete(_id);
    if (!post) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }
    res.status(200).json({ message: 'Publicación eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
