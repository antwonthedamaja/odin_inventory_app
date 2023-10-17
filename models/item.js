const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    condition: { type: String, enum: ["New", "Used", "Digital"], required: true },
    stock: { type: Schema.Types.Mixed, required: true },
    genre: { type: Schema.Types.ObjectId, ref: 'Genre', required: true },
    developer: { type: String, required: true },
    platform: { type: String, required: true },
    released: { type: Number, required: true }
});

itemSchema.virtual('url').get(function() {
    return `/items/${this._id}`;
});

itemSchema.virtual('storage').get(function() {
    return `/images/${this.name}.jpg`;
});

module.exports = mongoose.model("Item", itemSchema);