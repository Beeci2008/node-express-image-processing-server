const express = require('express')
const path = require('path')
const router = require('./src/router');

const app = express();

app.use('/', router)

const pathToIndex = path.resolve(__dirname, '../client/index.html')
app.use('/*', function (request, response) {
    response.sendFile(pathToIndex);
})

app.use(express.static(path.resolve(__dirname, 'uploads')))

module.exports = app;