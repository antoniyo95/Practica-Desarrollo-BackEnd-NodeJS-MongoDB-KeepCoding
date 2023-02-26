const mongoose = require('mongoose');

// Defino el esquema de los anuncios
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: {type: Number, min: 2, max: 20000},
    foto: String,
    tags: [String]
    });

anuncioSchema.statics.lista = function(filtro, skip, limit, sort, fields) {
    const query = Anuncio.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    query.select(fields);

    return query.exec();
}

// Creo el modelo de Anuncio
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// Exporto el modelo
module.exports = Anuncio;