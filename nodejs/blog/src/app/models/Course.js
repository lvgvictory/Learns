const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)

const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 600 },
    videoId: { type: String, maxLength: 255, required: true },
    slug: { type: String, slug: 'name'},
    image: { type: String, maxLength: 255 },
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', Course);
