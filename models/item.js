const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    condition: { type: String, enum: ["New", "Used", "Digital"], required: true },
    stock: { type: Number, min: 0, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, min: 0, required: true }
});

itemSchema.virtual('url').get(function() {
    return `/inventory/${this._id}`;
});

module.exports = mongoose.model("Item", itemSchema);