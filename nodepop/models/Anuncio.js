const mongoose = require('mongoose');

// Defino el esquema de los anuncios
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
    });

// Creo el modelo de Anuncio
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// Exporto el modelo
module.exports = Anuncio;