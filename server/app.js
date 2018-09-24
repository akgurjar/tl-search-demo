const express = require('express');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes');
const app = express();
const port = 3128;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res, next) {
    res.send('server running');
});

app.use('/api', apiRoutes);

app.listen(port, 'localhost', () => {
    console.log(`server is running on port ${port}`);
});

