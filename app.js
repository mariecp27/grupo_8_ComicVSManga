const express = require('express');
const path = require('path');
const app = express();

app.listen(3030, () => {console.log("Vamos al manga")});

app.get('/', (req,res) => {res.sendFile(path.join(__dirname, '/views/index.html')) } );

app.use (express.static('public'));
