# NodePop

Install dependencies with:

```sh
npm install
```


Start in development mode:

```sh
npm run dev
```

## General Info

Application created with:

```sh
npx express-generator nodepop --ejs
```

## Start a MongoDB Server in Macos or Linux

In the console go to MongoDB folder and:

```sh
./bin/mongod --dbpath ./data
```

## API Methods

### GET/apiv1/anuncios
The route of the first version is only capable of returning a complete list of available ads, acting as a "base backup" or a clean "starting" zone.

Result:
```sh
a
```

### GET/apiv2/anuncios
