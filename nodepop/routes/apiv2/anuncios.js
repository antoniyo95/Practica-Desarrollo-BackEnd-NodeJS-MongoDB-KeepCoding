const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');
const path = require('path');

// GET /apiv2/anuncios/fotos/:nombreArchivo
// Devuelve una imagen
router.get('/fotos/:nombreArchivo', async (req, res, next) => {
    try {
      const nombreArchivo = req.params.nombreArchivo;
      const rutaImagen = path.join(__dirname, '../../public/images', nombreArchivo);
      res.sendFile(rutaImagen);
    } catch (error) {
      next(error);
    }
  });

// GET /apiv2/anuncios
// Devuelve una lista de anuncios
router.get('/', async (req, res, next) => {
    try {
    
    // Filtros
    const filterByName = new RegExp('^' +
    req.query.nombre, "i");
    const filterBySell = req.query.venta;
    const filterByPrice = req.query.precio;
    
    // Paginación
    const skip = req.query.skip;
    const limit = req.query.limit;

    // Ordenación
    const sort = req.query.sort;

    // Selección de campos
    const fields = req.query.fields;
    
const filtro = {};

if (req.query.nombre) {
    filtro.nombre = filterByName
}

if (req.query.venta !== undefined) {
    filtro.venta = filterBySell;
}


// Filtro de precio por rango de precio especificado
if (req.query.precioMin || req.query.precioMax) {
    filtro.precio = {};
    if (req.query.precioMin) {
      filtro.precio.$gte = req.query.precioMin;
    }
    if (req.query.precioMax) {
      filtro.precio.$lte = req.query.precioMax;
    }
  }

const anuncios = await Anuncio.lista(filtro, skip, limit, sort, fields);

res.json({results: anuncios});


    } catch (error) {
    next(error);
    }
});

// GET /apiv2/anuncios/tags
// Devuelve una lista de los tags disponibles en los anuncios
router.get('/tags', async (req, res, next) => {
    try {

        const tags = await Anuncio.distinct('tags').exec();

        res.json({ results: tags });
        
    } catch (error) {
        next(error);
    }
});


// GET /apiv2/anuncios/(tags)
// Devuelve un anuncio o anuncios buscando por tags
router.get('/:tags', async (req, res, next) => {
    try {
    
        const tags = req.params.tags;

        const anuncio = await Anuncio.lista({tags: tags});

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

// POST /apiv2/anuncios (body)
// Crea un nuevo anuncio
router.post('/', async (req, res, next) => {
    try {
        
        const anuncioData = req.body;

        // Creo una instancia de Anuncio
        const anuncio = new Anuncio(anuncioData);

        // La persisto en la BD
        const anuncioGuardado = await anuncio.save();

        res.json({result: anuncioGuardado});

    } catch (error) {
      next(error);
    }
});

// DELETE /apiv2/anuncios/:(id)
// Elimina un anuncio
router.delete('/:id', async (req, res, next) => {
    try {

        const id = req.params.id;

        await Anuncio.deleteOne({_id: id});

        res.json(); // No contestamos ya que es suficiente con un 200 OK para saber que ha sido borrado
        
    } catch (error) {
      next(error);
    }
})


module.exports = router;