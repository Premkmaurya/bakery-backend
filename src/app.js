const express = require('express');



const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const cartRoutes = require('./routes/cart.routes');



const cookiesParser = require('cookie-parser');
const app = express();


app.use(express.json());
app.use(cookiesParser());


app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.use('/orders', orderRoutes);
app.use('/cart', cartRoutes);

module.exports = app;