const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const movieRoutes = require('./routes/movie.routes');
const favouritesRoutes = require('./routes/favourites.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/favourites', favouritesRoutes);

app.get('/', (req, res) => res.send('Backend is working!'));

module.exports = app;