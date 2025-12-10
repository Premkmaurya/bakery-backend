const express = require('express');



const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const cartRoutes = require('./routes/cart.routes');
const reviewsRoutes = require('./routes/reviews.routes');
const wishlistRoutes = require('./routes/wishlist.routes');


const cookiesParser = require('cookie-parser');
const app = express();


app.use(express.json());
app.use(cookiesParser());


app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/orders', orderRoutes);
app.use('/cart', cartRoutes);
app.use('/wishlist', wishlistRoutes);

module.exports = app;