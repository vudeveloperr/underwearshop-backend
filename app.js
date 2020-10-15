const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
//const session =  require('express-session');

const mongoose = require('mongoose');
const apiRouter = require('./routers/api');

const app = express();

app.use(cors({ origin: ['http://localhost:3000', 'https://unterwasche.herokuapp.com'] , credentials : true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://vanvu:admin1@ds141221.mlab.com:41221/project-web23', (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(" DB connect success!");
    }
})

app.use('/api', apiRouter);

app.listen(process.env.PORT || 6969, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Server start success!!")
    }
})