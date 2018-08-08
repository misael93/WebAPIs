var mongoose = require("mongoose");

var AlbumSchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    releaseDate: Date,
    images: [String],
    _artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist" }
}, {
    timestamps: true
});

module.exports = mongoose.model("Album", AlbumSchema);