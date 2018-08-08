var Song = require("../models/song");
var Album = require("../models/album");

exports.getSongs = (req, res, next) => {

    Song.find({})
        .populate("_album")
        .exec((err, albums) => {

            if (err) {
                res.send(err);
            }
    
            res.status(200).json(albums);

        });

}

exports.createSong = (req, res, next) => {

    var title = req.body.title;
    var identifier = req.body.identifier;
    var previewURL = req.body.previewURL;
    var trackNumber = req.body.trackNumber;
    var duration = req.body.duration;
    var albumId = req.body.albumId;

    if (!title) {
        return res.status(400).send({ error: "You must enter a title" });
    }

    if (!albumId) {
        return res.status(400).send({ error: "You must enter an album Id" });
    }

    var identifier = title.replace(/[^\w]/g, "").toLowerCase();

    Song.findOne({ identifier: identifier },
        (err, song) => {

            if (err) {
                return res.status(400).send(err);
            }

            if (song) {
                return res.status(409).send({ error: "This song already exists" });
            }

            Album.findOne({ _id: albumId },
                (err, album) => {

                    if (err) {
                        return res.status(400).send(err);
                    }

                    if (!album) {
                        return res.status(404).send({ error: "Album not found" });
                    }

                    Song.findOne({ _album: albumId, trackNumber: trackNumber },
                        (err, song) => {

                            if (err) {
                                return res.status(400).send(err);
                            }

                            if (song) {
                                return res.status(409).send({ error: `There is already a song in this album with track number ${trackNumber}` });
                            }

                            var song = new Song({
                                identifier: identifier,
                                title: title,
                                previewURL: previewURL,
                                trackNumber: trackNumber,
                                duration: duration,
                                _album: albumId
                            });
        
                            song.save((err, song) => {
                                if (err) {
                                    res.status(400).send(err);
                                }
                                res.status(200).json(song);
                            });

                        });

                });

        });

}

exports.getSong = (req, res, next) => {

    identifier = req.params.identifier;

    if (!identifier) {
        return res.status(400).send({ error: "You must enter an identifier" });
    }

    Song.findOne({ identifier: identifier })
        .populate("_album")
        .exec((err, song) => {

            if (err) {
                return res.status(400).send(err);
            }

            if (!song) {
                return res.status(404).json({ error: "Song not found" })
            }

            res.status(200).json(song);

        });

}

exports.updateSong = (req, res, next) => {

    var identifier = req.params.identifier;
    var title = req.body.title;
    var trackNumber = req.body.trackNumber;
    var albumId = req.body.albumId;

    if (!identifier) {
        return res.status(400).send({ error: "You must enter an identifier" });
    }

    if (!title) {
        return res.status(400).send({ error: "You must enter a title" });
    }

    if (!albumId) {
        return res.status(400).send({ error: "You must enter an album Id" });
    }

    Album.findOne({ _id: albumId },
        (err, album) => {

            if (err) {
                return res.status(400).send(err);
            }

            if (!album) {
                return res.status(404).send({ error: "Album not found" });
            }

            Song.findOne({ identifier: { $ne: identifier }, _album: albumId, trackNumber: trackNumber },
                (err, song) => {

                    if (err) {
                        return res.status(400).send(err);
                    }

                    if (song) {
                        return res.status(409).send({ error: `There is already a song in this album with track number ${trackNumber}` });
                    }

                    Song.findOneAndUpdate({ identifier: identifier },
                        req.body,
                        { new: true, runValidators: true },
                        (err, song) => {
        
                            if (err) {
                                return res.status(400).send(err);
                            }
        
                            if (!song) {
                                return res.status(404).send({ error: "Song not found" });
                            }
        
                            res.status(200).json(song);
        
                        });

                });

        });

}

exports.deleteSong = (req, res, next) => {

    identifier = req.params.identifier;

    if (!identifier) {
        return res.status(400).send({ error: "You must enter an identifier" });
    }

    Song.findOneAndDelete({ identifier: req.params.identifier },
        (err, song) => {

            if (err) {
               return  res.status(400).send(err);
            }

            if (!song) {
                return res.status(404).send({ error: "Song not found" });
            }

            res.status(200).json(song);

        });

}
