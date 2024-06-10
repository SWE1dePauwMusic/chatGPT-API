import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import gptRoute from './api/gptRoute.js'

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send('gaa');
});

app
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())

app.use('/', gptRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
