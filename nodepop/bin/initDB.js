'use strict';

const Anuncio = require('../models/Anuncio');
const connection = require('../lib/connectMongoose');

main().catch(err => console.log('Hubo un error', err));

async function main() {

    // Se inicializa la colección de anuncios
    await initAnuncios();

    // Se cierra conexión a base de datos
    connection.close();

}

async function initAnuncios() {
    // Se borran todos los documentos de la colección de anuncios
    const deleted = await Anuncio.deleteMany();
    console.log(`Se han eliminado ${deleted.deletedCount} anuncios.`);

    // Se crean anuncios iniciales
    const inserted = await Anuncio.insertMany([
        {nombre: 'Audi A4', venta: false, precio: '17000', foto: 'Audi.jpg', tags: ['motor', 'lifestyle']},
        {nombre: 'Iphone 13', venta: true, precio: '1200', foto: 'Iphone.jpg', tags: ['mobile', 'lifestyle']}
    ]);
    console.log(`Creados ${inserted.length} anuncios.`);
}