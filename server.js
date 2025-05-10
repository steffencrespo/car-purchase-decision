require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');

const {router: usersRouter} = require('./users');
const {router: authRouter, basicStrategy, jwtStrategy} = require('./auth');

const {PORT, DATABASE_URL} = require('./config');
const {Car} = require('./models');

const app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    if (req.method === 'OPTIONS') {
        return res.send(204);
    }
    next();
});

// Authentication specifics
app.use(passport.initialize());
passport.use(basicStrategy);
passport.use(jwtStrategy);

app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express.static(__dirname));

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);

app.post('/purchaseList', passport.authenticate('jwt', {session: false}), (req, res) => {
  const requiredFields = ['userId', 'make', 'model', 'year'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if(!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Car.create({
    userId: req.body.userId,
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

app.get('/purchaseList/:userId', passport.authenticate('jwt', {session: false}), (req, res) => {
  Car
    .findByUserId(req.params.userId)
    .sort({make: 1})
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

app.put('/purchaseList/:carId', passport.authenticate('jwt', {session: false}), (req, res) => {
	Car
    .findByIdAndUpdate(req.params.carId, {
      comments: req.body.comments
    })
    .then(
      car => {
        res.json({
          car: car.apiRepr()
        });
      })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
      })
});

app.delete('/purchaseList/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
	Car
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(() => res.status(500).json({message: 'Internal server error'}));
});

app.use('*', (req, res) => {
    return res.status(404).json({message: 'Not Found'});
});

let server;

async function runServer(databaseUrl = DATABASE_URL, port = PORT) {
    console.log(`Attempting to connect to port ${port}`);
    try {
        await mongoose.connect(databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        server = app.listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
        });

    } catch (err) {
        console.error('Failed to connect to MongoDB or start server:', err);
        throw err;
    }
}


function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server connection');
      server.close((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
    console.log('calling server.js as Main')
    runServer().catch(err => {
        console.error(err);
        process.exit(1);
    });
}

module.exports = {app, runServer, closeServer};
