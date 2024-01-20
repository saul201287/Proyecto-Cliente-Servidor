require('dotenv').config();

const express = require('express');
const app = express();
const productsRouter = require('./controllers/usuario.controller');
const cors = require('./middlewares/cors.middleware');

app.use(cors);
app.use(express.json());
app.use('/products', productsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API escuchando en el puerto ${PORT}`);
});