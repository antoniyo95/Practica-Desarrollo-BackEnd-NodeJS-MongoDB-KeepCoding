const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

// GET /apiv2/anuncios
// Devuelve una lista de anuncios
router.get('/', async (req, res, next) => {
    try {
    const anuncios = await Anuncio.find();

    res.json({results: anuncios});

    } catch (error) {
    next(error);
    }
});

// GET /apiv2/anuncios/(tags)
// Devuelve un anuncio o anuncios buscando por tags
router.get('/:tags', async (req, res, next) => {
    try {
    
        const tags = req.params.tags;

        const anuncio = await Anuncio.find(tags);

        res.json({result: anuncio});

    } catch (error) {
      next(error);
    }
} );

// PUT /apiv2/anuncios/:(id)    (body)
// Actualiza un anuncio
router.put('/:id', async (req, res, next) => {
    try {

        const id = req.params.id;
        
        const data = req.body;

        const anuncioActualizado = await Anuncio.findByIdAndUpdate(id, data, {
            new: true // Éste new: true nos devuelve el documento actualizado
        });

        res.json({result: anuncioActualizado});
        
    } catch (error) {
      next(error);
    }
});


module.exports = router;