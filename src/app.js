const express = require('express');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const paymentRoutes = require('./routes/payment.routes');
const cookiesParser = require('cookie-parser');
const app = express();


app.use(express.json());
app.use(cookiesParser());


app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/payments', paymentRoutes);


module.exports = app;