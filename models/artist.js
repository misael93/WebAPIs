var mongoose = require("mongoose");

var ArtistSchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true,
        index: { unique: true }
    },
    name: {
        type: String,
        required: true,
        index: { unique: true }
    },
    debut: {
        type: Date
    },
    genres: {
        type: [String]
    },
    images: {
        type: [String]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Artist", ArtistSchema);