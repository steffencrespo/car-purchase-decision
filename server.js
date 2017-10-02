const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');

mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const {PORT, DATABASE_URL} = require('./config');
const CarsList = require('./models');

app.get('/', (req, res) => {
	return res.status(200).sendFile('/public/index.html', {root: __dirname });
});

app.get('/login', (req, res) => {
	return res.status(200).sendFile('/public/login.html', {root: __dirname});
});

app.post('/login', (req, res) => {
	return res.status(200).json(req.body);
});

app.get('/signup', (req, res) => {
	return res.status(200).sendFile('/public/signup.html', {root: __dirname});
});

app.post('/signup', (req, res) => {
	return res.status(201).end();
});

app.get('/carDetails', (req, res) => {
  return res.status(200).sendFile('/public/car-details.html', {root: __dirname});
})

app.post('/purchaseList', (req, res) => {
	return res.status(200).sendFile('/public/purchase.html', {root: __dirname });
});

app.get('/purchaseList', (req, res) => {
	return res.status(200).sendFile('/public/purchase.html', {root: __dirname });
});

app.put('/purchaseList/:id', (req, res) => {
	return res.status(200).sendFile('/public/purchase.html', {root: __dirname});
});

app.delete('/purchaseList/:id', (req, res) => {
	return res.status(201).end();
});

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  console.log(`Attempting to connect to port ${port}`);
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if(err) {
        return reject(err);
      } 
        server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
      });
  });
}

if (require.main === module) {
  console.log('calling server.js as Main')
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer};
