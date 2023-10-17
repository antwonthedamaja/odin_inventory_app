const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true }
});

genreSchema.virtual('url').get(function() {
    return `/genre/${this.name}`;
});

genreSchema.virtual('storage').get(function() {
    return `images/${this.name}.jpg`;
});

module.exports = mongoose.model("Genre", genreSchema);