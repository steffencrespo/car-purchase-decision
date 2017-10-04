const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    userId: String,
    make: String,
    model: String,
    year: String,
    trim: String,
    engine: String,
    dealerUrl: String,
    listedPrice: Number,
    sellerName: String,
    comments: String
  });

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
      comments: String
    }
  ]
});

carsListSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    listName: this.listName,
    cars: this.cars
  }
}

const Car = mongoose.model('Car', carSchema)
const CarsList = mongoose.model('CarsList', carsListSchema);

module.exports = {CarsList, Car};