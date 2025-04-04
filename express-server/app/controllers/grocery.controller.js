const Grocery = require('../models/GroceryItem');

// Get all groceries for the logged-in user
exports.getAll = async (req, res) => {
  try {
    const groceries = await Grocery.find({ user: req.user.id });
    res.json(groceries);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch groceries" });
  }
};

// Add a grocery item
exports.add = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newItem = new Grocery({
      name,
      quantity,
      user: req.user.id,
    });

    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Failed to add item", error: err.message });
  }
};

// Toggle "found" status
exports.toggleFound = async (req, res) => {
  try {
    const item = await Grocery.findOne({ _id: req.params.id, user: req.user.id });
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.found = !item.found;
    await item.save();

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle item" });
  }
};

// Edit name/quantity
exports.update = async (req, res) => {
  try {
    const item = await Grocery.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: req.body },
      { new: true }
    );

    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Failed to update item" });
  }
};

// Delete grocery item
exports.remove = async (req, res) => {
  try {
    const deleted = await Grocery.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete item" });
  }
};

