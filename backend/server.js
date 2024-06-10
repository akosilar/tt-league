require('dotenv').config({ path: '../.env' });
const express = require('express');
const playerRoutes = require('./routes/playerRoutes');
const mongoose = require('mongoose');

//use local db if env is local, and if it exists. Otherwise use the mongo cloud URI
const db = (process.env.ENV && process.env.ENV === "local") ? process.env.MONGO_LOCAL : process.env.MONGO_URI;

const app = express();

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use(express.json());

app.use('/api/players', playerRoutes);

mongoose.connect(db)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
