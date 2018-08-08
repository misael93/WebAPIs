var Album = require("../models/album");
var Artist = require("../models/artist");

exports.getAlbums = (req, res, next) => {

    Album.find({})
        .populate("_artist")
        .exec((err, albums) => {

            if (err) {
                res.send(err);
            }
    
            res.status(200).json(albums);

        });

}

exports.createAlbum = (req, res, next) => {

    var name = req.body.name;
    var identifier = req.body.identifier;
    var releaseDate = req.body.releaseDate;
    var images = req.body.images;
    var artistId = req.body.artistId;

    if (!name) {
        return res.status(400).send({ error: "You must enter a name" });
    }

    if (!artistId) {
        return res.status(400).send({ error: "You must enter an artist Id" });
    }

    var identifier = name.replace(/[^\w]/g, "").toLowerCase();

    Album.findOne({ identifier: identifier },
        (err, album) => {

            if (err) {
                return res.status(400).send(err);
            }

            if (album) {
                return res.status(409).send({ error: "This album already exists" });
            }

            Artist.findOne({ _id: artistId },
                (err, artist) => {

                    if (err) {
                        return res.status(400).send(err);
                    }

                    if (!artist) {
                        return res.status(404).send({ error: "Artist not found" });
                    }

                    var album = new Album({
                        identifier: identifier,
                        name: req.body.name,
                        releaseDate: releaseDate,
                        images: images,
                        _artist: artistId
                    });

                    album.save((err, album) => {
                        if (err) {
                            res.status(400).send(err);
                        }
                        res.status(200).json(album);
                    });

                });

        });

}

exports.getAlbum = (req, res, next) => {

    identifier = req.params.identifier;

    if (!identifier) {
        return res.status(400).send({ error: "You must enter an identifier" });
    }

    Album.findOne({ identifier: identifier })
        .populate("_artist")
        .exec((err, album) => {

            if (err) {
                return res.status(400).send(err);
            }

            if (!album) {
                return res.status(404).json({ error: "Album not found" })
            }

            res.status(200).json(album);

        });

}

exports.updateAlbum = (req, res, next) => {

    var identifier = req.params.identifier;
    var name = req.body.name;
    var artistId = req.body.artistId;

    if (!identifier) {
        return res.status(400).send({ error: "You must enter an identifier" });
    }

    if (!name) {
        return res.status(400).send({ error: "You must enter a name" });
    }

    if (!artistId) {
        return res.status(400).send({ error: "You must enter an artist Id" });
    }

    Artist.findOne({ _id: artistId },
        (err, artist) => {

            if (err) {
                return res.status(400).send(err);
            }

            if (!artist) {
                return res.status(404).send({ error: "Artist not found" });
            }

            Album.findOneAndUpdate({ identifier: identifier },
                req.body,
                { new: true, runValidators: true },
                (err, album) => {

                    if (err) {
                        return res.status(400).send(err);
                    }

                    if (!album) {
                        return res.status(404).send({ error: "Album not found" });
                    }

                    res.status(200).json(album);

                });

        });

}

exports.deleteAlbum = (req, res, next) => {

    identifier = req.params.identifier;

    if (!identifier) {
        return res.status(400).send({ error: "You must enter an identifier" });
    }

    Album.findOneAndDelete({ identifier: req.params.identifier },
        (err, album) => {

            if (err) {
                return res.status(400).send(err);
            }

            if (!album) {
                return res.status(404).send({ error: "Album not found" });
            }

            res.status(200).json(album);

        });

}
