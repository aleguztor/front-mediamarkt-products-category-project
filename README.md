# Proyecto Mediamarkt "Productos"

Este es el cliente web para la gestión de productos de MediaMarkt. Una interfaz moderna, reactiva y optimizada para la administración de inventario, categorías y precios.

### Requisitos

- pnpm
- Node version 25.2.1

### Cómo iniciar el proyecto

- Tendremos que tener el BackEnd corriendo por detrás para el correcto funcionamiento. Para ello tenemos que descargarnos el siguiente [repositorio](https://github.com/aleguztor/back-mediamarkt-products-category-project) y seguir las direcciones que aparecen en su README.

- Creamos en la raiz del proyecto el archivo .env.local y añadimos las siguientes variables:

  > VITE_API_BASE_URL=http://localhost:5186/api

- Instalamos las dependencias e iniciamos proyecto

```sh
npm i
npm run dev
```

- Después de esto podremos acceder con la url [http://localhost:5173](http://localhost:5173/)
