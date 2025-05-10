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

carSchema.methods.apiRepr = function() {
  return {
      id: this._id,
      make: this.make,
      model: this.model,
      year: this.year,
      trim: this.trim,
      engine: this.engine,
      dealerUrl: this.dealerUrl,
      listedPrice: this.listedPrice,
      sellerName: this.sellerName,
      comments: this.comments
    }
}

carSchema.statics.findByUserId = function(id) {
    return this.find( {userId: id} );
};

const Car = mongoose.model('Car', carSchema)

module.exports = {Car};