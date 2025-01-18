const express = require('express')
const uuid = require('uuid');
const cors = require('cors');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');

mongoose.connect('mongodb://127.0.0.1:27017/urlshortnerdb')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    })

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/urls', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    if (shortUrls && shortUrls.length > 0) {
        res.status(200).send({
            status: 'success',
            data: shortUrls
        });
    }
})

app.post('/shorten', async (req, res) => {
    const shortUrl = await ShortUrl.create({
        fullUrl: req.body.url,
        shortUrl: uuid.v4(),
        clicks: 0,
    });

    res.status(200).send({
        status: 'success',
        data: shortUrl
    });

})

app.post('/visit/', async (req, res) => {
    console.log("Request query: ", req.body.shortUrl);

    const result = await ShortUrl.findOne({ shortUrl: req.body.shortUrl });
    console.log(result);
    if (result) {
        result.clicks += 1;
        await result.save();
    }
    res.status(200).send({
        message: "Hello",
        data: result.fullUrl ?? "No data found",
    });
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})