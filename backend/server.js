require('dotenv').config();
const express = require('express');
const playerRoutes = require('./routes/playerRoutes');
const mongoose = require('mongoose');

const app = express();

app.use((req, res, next) =>{
    console.log(req.path, req.method);
    next();
});

app.use(express.json());

app.use('/api/players', playerRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });