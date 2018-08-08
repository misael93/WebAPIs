var Artist = require("../models/artist");

exports.getArtists = (req, res, next) => {

    Artist.find({}, (err, artists) => {

        if (err) {
            res.send(err);
        }

        res.status(200).json(artists);

    });

}

exports.createArtist = (req, res, next) => {

    var name = req.body.name;
    var genres = req.body.genres;
    var images = req.body.images;

    if (!name) {
        return res.status(400).send({ error: "You must enter a name" });
    }

    var identifier = name.replace(/[^\w]/g, "").toLowerCase();

    Artist.findOne({ identifier: identifier },
        (err, artist) => {

            if (err) {
                return res.status(400).send(err);
            }

            if (artist) {
                return res.status(409).send({ error: "This artist already exists" });
            }

            var artist = new Artist({
                identifier: identifier,
                name: req.body.name,
                genres: genres,
                images: images
            });

            artist.save((err, artist) => {

                if (err) {
                    res.status(400).send(err);
                }

                res.status(200).json(artist);

            });

        });

}

exports.getArtist = (req, res, next) => {

    identifier = req.params.identifier;

    if (!identifier) {
        return res.status(400).send({ error: "You must enter an identifier" });
    }

    Artist.findOne({ identifier: identifier },
        (err, artist) => {

            if (err) {
                return res.status(400).send(err);
            }

            if (!artist) {
                return res.status(404).json({ error: "Artist not found" })
            }

            res.status(200).json(artist);

        });

}

exports.updateArtist = (req, res, next) => {

    identifier = req.params.identifier;

    if (!identifier) {
        return res.status(400).send({ error: "You must enter an identifier" });
    }

    Artist.findOneAndUpdate({ identifier: identifier },
        req.body,
        { new: true, runValidators: true },
        (err, artist) => {

            if (err) {
                return res.status(400).send(err);
            }

            if (!artist) {
                return res.status(404).send({ error: "Artist not found" });
            }

            res.status(200).json(artist);

        });

}

exports.deleteArtist = (req, res, next) => {

    identifier = req.params.identifier;

    if (!identifier) {
        return res.status(400).send({ error: "You must enter an identifier" });
    }

    Artist.findOneAndDelete({ identifier: req.params.identifier },
        (err, artist) => {

            if (err) {
                return res.status(400).send(err);
            }

            if (!artist) {
                return res.status(404).send({ error: "Artist not found" });
            }

            res.status(200).json(artist);

        });

}
