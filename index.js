require("dotenv").config()
const express = require('express')
const addRoots = require('./root')
const app = express()                       

app.use(express.json());                    

addRoots(app)



app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();   // hadd válaszoljon rá az Express magától
    }
    res.status(404).json({
        error: 'Not found',
        method: req.method,
        path: req.originalUrl
    });
});


const port = process.env.PORT || 3000

var server = app.listen(3000, function () { 
    console.log(`Server running on http://localhost:${port}`); // Konzolra kiír egy üzenetet, hogy a szerver fut és melyik porton érhető el.
});