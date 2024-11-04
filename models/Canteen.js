const mongoose = require('mongoose');

const CanteenSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    foodItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' }],
    reviews: [{ type: String }],
    averageRating: { type: Number, default: 0 }
});

module.exports = mongoose.model('Canteen', CanteenSchema);
