const mongoose = require('mongoose');

const carsListSchema = mongoose.Schema({
  listName: {type: String, required: true},
  cars: [ 
    {
      id: String,
      make: String,
      model: String,
      year: String,
      trim: String,
      engine: String,
      dealerUrl: String,
      listedPrice: Number,
      sellerName: String,
      comments: String,
    }
  ]
});

const CarsList = mongoose.model('CarsList', carsListSchema);

module.exports = {CarsList};