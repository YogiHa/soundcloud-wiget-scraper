const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');

const webCrawler = require('./controllers/webCrawler');


const app = express();

const whiteList = ['http://localhost:3000'];
const corsOptions = {
    origin: function(origin, callback) {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('NOT ALLOWED'))
        }
    }
}

app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(compression())


app.post('/soundcloudcrawler', (req, res) => { webCrawler.handleScrap(req, res) })


app.listen(process.env.PORT || 3001, () => {
    console.log(`app is running on port ${process.env.PORT || 3001 }`);
})