const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true }
});

genreSchema.virtual('url').get(function() {
    return `/genre/${this.name}`;
});

module.exports = mongoose.model("Genre", genreSchema);