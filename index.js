const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded( {extended: false} ))

const userRoute = require('./userRoutes')
userRoute(app)
app.listen(3000)