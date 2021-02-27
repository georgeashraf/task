const express = require('express');

const mongoose = require('mongoose');
const auth_route = require('./routes/Auth');
const leaves_route = require('./routes/Leaves');
var cors = require('cors');
const bodyParser = require('body-parser');

const port = 8000;
mongoose.connect('mongodb+srv://admin:admin%40123%21%40%23@cluster0.7ej3m.mongodb.net/et3?retryWrites=true&w=majority', { useNewUrlParser: true }).
    catch(error => console.log(error));

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());





// route middleware
app.use('/index', leaves_route);
app.use('/auth', auth_route);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));