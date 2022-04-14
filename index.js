require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// LER JSON / middlewares

app.use(express.json({
        extended: true,
    }),
)

// rotas api
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

// ROTA INICIAL / ENDPOINT
app.get('/', (req, res) => {
    res.json({message: 'Comecei no Node.js'})
})

//ENTREGAR UMA PORTA

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.mtpk7.mongodb.net/BancoDaApi?retryWrites=true&w=majority`
        )
        .then(() => {
            console.log('Conectado ao mongo')
            app.listen(3000)
        })

        .catch((err) => console.log(err));


