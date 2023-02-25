const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

// GET /apiv1/anuncios
// Devuelve una lista de anuncios
router.get('/', async (req, res, next) => {
    try {
    const anuncios = await Anuncio.find();

    res.json({results: anuncios});

    } catch (error) {
    next(error);
    }
})

module.exports = router;