const express = require('express');
const Post = require('../models/Post');
const router = express.Router();


router.post('/create', async (req, res) => {
    try {
        const { title, body } = req.body;
        if (!title || !body) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }
        const newPost = new Post({ title, body });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
});


router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
});


router.get('/id/:_id', async (req, res) => {
    try {
        const post = await Post.findById(req.params._id);
        if (!post) {
            return res.status(404).json({ error: "Publicación no encontrada" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
});


router.get('/title/:title', async (req, res) => {
    try {
        const post = await Post.findOne({ title: req.params.title });
        if (!post) {
            return res.status(404).json({ error: "Publicación no encontrada" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
});


router.put('/id/:_id', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ error: "Publicación no encontrada" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
});


router.delete('/id/:_id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params._id);
        if (!post) {
            return res.status(404).json({ error: "Publicación no encontrada" });
        }
        res.json({ mensaje: "Publicación eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
});

module.exports = router;
