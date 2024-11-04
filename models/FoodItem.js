const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    available: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('FoodItem', FoodItemSchema);
