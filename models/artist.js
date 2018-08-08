var mongoose = require("mongoose");

var ArtistSchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    genres: [String],
    images: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model("Artist", ArtistSchema);