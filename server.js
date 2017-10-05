const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');

mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const {PORT, DATABASE_URL} = require('./config');
const {CarsList, Car} = require('./models');

app.post('/login', (req, res) => {
	return res.status(200).json(req.body);
});

app.post('/signup', (req, res) => {
	return res.status(201).end();
});

app.post('/purchaseList', (req, res) => {
  Car.create({
    userId: "1",
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    trim: req.body.trim,
    engine: req.body.engine,
    dealerUrl: req.body.dealerUrl,
    listedPrice: req.body.listedPrice,
    sellerName: req.body.sellerName,
    comments: req.body.comments
  })
  .then(
    car => res.status(200).json(car.apiRepr()))
  .catch(err => {
    console.error(err);
    res.status(500).json({message: 'Internal server error'});
  });
});

app.get('/purchaseList', (req, res) => {
  Car
    .find()
    .limit(10)
    .then(cars => {
      res.json({
        cars: cars.map(
          (car) => car.apiRepr())
      });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
      }
    );
});

app.put('/api/purchaseList/car', (req, res) => {
	CarsList
    .findById("59074c7c057aaffaafb0da64")
    .then(
      carsList => {
        res.json({
          carsList: carsList.cars.map(car => car.model)
        });
        // carsList.cars.map(car => console.log(car))
      })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
      })
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
