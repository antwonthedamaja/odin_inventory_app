const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true }
});

categorySchema.virtual('url').get(function() {
    return `/category/${this.name}`;
});

module.exports = mongoose.model("Category", categorySchema);