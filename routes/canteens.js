const express = require('express');
const Canteen = require('../models/Canteen');
const FoodItem = require('../models/FoodItem');
const router = express.Router();

// Display list of canteens
router.get('/', async (req, res) => {
    try {
        const canteens = await Canteen.find({});
        res.render('canteens', { canteens });
    } catch (err) {
        res.status(500).send('Error retrieving canteens');
    }
});

// Display canteen details and food items
router.get('/:canteenId', async (req, res) => {
    try {
        const canteen = await Canteen.findById(req.params.canteenId).populate('foodItems');
        res.render('canteenDetails', { canteen });
    } catch (err) {
        res.status(500).send('Error retrieving canteen details');
    }
});

// Display form for adding a new canteen
router.get('/new', (req, res) => {
    res.render('createCanteen'); // Render the form for creating a canteen
});

// Create a new canteen
router.post('/', async (req, res) => {
    try {
        const newCanteen = new Canteen(req.body);
        await newCanteen.save();
        res.redirect('/canteens'); // Redirect to the list of canteens after creation
    } catch (err) {
        res.status(500).send('Error creating canteen');
    }
});

// Add Food Item to Canteen
router.post('/:canteenId/foodItem', async (req, res) => {
    try {
        const newFoodItem = new FoodItem(req.body);
        await newFoodItem.save();

        const canteen = await Canteen.findById(req.params.canteenId);
        canteen.foodItems.push(newFoodItem);
        await canteen.save();

        res.redirect(`/canteens/${req.params.canteenId}`);
    } catch (err) {
        res.status(500).send('Error adding food item');
    }
});

// Delete Food Item from Canteen
router.delete('/:canteenId/foodItem/:foodItemId', async (req, res) => {
    try {
        // Find and remove food item from the database
        await FoodItem.findByIdAndDelete(req.params.foodItemId);
        
        // Find the canteen and remove the food item from its foodItems array
        const canteen = await Canteen.findById(req.params.canteenId);
        canteen.foodItems.pull(req.params.foodItemId);
        await canteen.save();

        res.redirect(`/canteens/${req.params.canteenId}`);
    } catch (err) {
        res.status(500).send('Error deleting food item');
    }
});

// Update Food Item in Canteen
router.put('/:canteenId/foodItem/:foodItemId', async (req, res) => {
    try {
        // Update the food item based on the ID
        await FoodItem.findByIdAndUpdate(req.params.foodItemId, req.body, { new: true });

        res.redirect(`/canteens/${req.params.canteenId}`);
    } catch (err) {
        res.status(500).send('Error updating food item');
    }
});

module.exports = router;