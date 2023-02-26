# NodePop

Install dependencies with:

```sh
npm install
```

Start without developer mode:

```sh
npm run start
```

Start in development mode:

```sh
npm run dev
```

Start the server by deleting the content added to the database and loading some default ads:

```sh
npm run initDB
```
-----------------
## General Info

Application created with:

```sh
npx express-generator nodepop --ejs
```
---------
## Start a MongoDB Server in Macos or Linux

In the console go to MongoDB folder and:

```sh
./bin/mongod --dbpath ./data
```
---------------
## API Methods

### GET/apiv1/anuncios
The route of the first version is only capable of returning a complete list of available ads, acting as a "base backup" or a clean "starting" zone.

Result:
```sh
{"results":[{"_id":"63fb874a62f3592a52e39a11","nombre":"Audi A4","venta":false,"precio":17100,"foto":"/images/Audi.jpg","tags":["motor","lifestyle"],"__v":0},{"_id":"63fb874a62f3592a52e39a12","nombre":"Iphone 13","venta":true,"precio":1230,"foto":"/images/Iphone.jpg","tags":["mobile","lifestyle"],"__v":0},{"_id":"63fb874a62f3592a52e39a13","nombre":"PC Sobremesa","venta":true,"precio":780,"foto":"/images/PC.jpg","tags":["work","lifestyle"],"__v":0},{"_id":"63fb874a62f3592a52e39a14","nombre":"Taladro","venta":false,"precio":78,"foto":"/images/Taladro.jpg","tags":["work"],"__v":0}]}
```
-------------

### GET/apiv2/anuncios
This version 2 of the API contains everything that is needed or requested in the requested practice, being for now the "final version" of the API.

With this, several queries or methods can be executed, which are the following:

-----------

```sh
GET /apiv2/anuncios
```
Returns a list of ads with pagination, filters, sorting, and field selection.

```sh
GET /apiv2/anuncios/tags
```
Returns a list of available tags in the ads.

```sh
GET /apiv2/anuncios/:tags
```
Returns a list of ads filtered by tags.

```sh
PUT /apiv2/anuncios/:id
```
Updates an ad by ID.

```sh
POST /apiv2/anuncios 
```
Creates a new ad where you can add: nombre, venta, precio, foto, tags.

```sh
DELETE /apiv2/anuncios/:id
```
Deletes an ad by ID.

-------------
## Filters

You can filter by name using the nombre query parameter. For example, to filter by name "iPhone", you would use the URL
```sh
http://127.0.0.1:3000/apiv2/anuncios?nombre=Iphone
```

But you can also find it without the full name, for example if you type: Iph

```sh
http://127.0.0.1:3000/apiv2/anuncios?nombre=Iph
```

You can filter by whether the item is for sale or not using the venta query parameter. To filter for items that are for sale, you would use the URL
```sh
http://127.0.0.1:3000/apiv2/anuncios?venta=true.
```

To filter for items that are not for sale, you would use the URL
```sh
http://127.0.0.1:3000/apiv2/anuncios?venta=false.
```

To filter by price, you must select a minimum and maximum price as shown in the following example:
```sh
http://127.0.0.1:3000/apiv2/anuncios?precioMin=1000&precioMax=20000
```
-----------------
## Routes
You can also see the existing "tags" at the following route:

```sh
http://127.0.0.1:3000/apiv2/anuncios/tags
```

You can view the requested image by searching for them as follows:

```sh
http://127.0.0.1:3000/apiv2/anuncios/fotos/Taladro.jpg
```
```sh
http://127.0.0.1:3000/apiv2/anuncios/fotos/Audi.jpg
```
```sh
http://127.0.0.1:3000/apiv2/anuncios/fotos/Iphone.jpg
```
```sh
http://127.0.0.1:3000/apiv2/anuncios/fotos/PC.jpg
```

