var mongoose = require("mongoose");

var SongSchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    previewURL: String,
    trackNumber: Number,
    duration: Number,
    _album: { type: mongoose.Schema.Types.ObjectId, ref: "Album" }
});

module.exports = mongoose.model("Song", SongSchema);