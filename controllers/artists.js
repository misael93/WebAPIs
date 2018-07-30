var Artist = require("../models/artist");

exports.getArtists = (req, res, next) => {

    Artist.find({}, (err, artists) => {
        if(err)
            res.send(err);
        res.status(200).json(artists);
    });

}

exports.createArtist = (req, res, next) => {

    var name = req.body.name;

    if(!name)
        res.status(400).send({ error: "You must enter a name" });
    else {
        var artist = new Artist ({
            identifier: name.replace(" ", "-").toLowerCase(),
            name: req.body.name,
            debut: new Date(),
            genres: req.body.genres,
            images: req.body.images
        });
        artist.save((err, artist) => {
            if (err)
                res.status(400).send(err);
            res.status(200).json(artist);
        });
    }

}

exports.getArtist = (req, res, next) => {

    Artist.find({ identifier: req.params.identifier },
        (err, artist) => {
            if (err)
                res.status(400).send(err);
            res.status(200).json(artist);
        });

}

exports.updateArtist = (req, res, next) => {

    Artist.findOneAndUpdate({ identifier: req.params.identifier },
        req.body,
        { new: true, runValidators: true },
        (err, artist) => {
            if (err)
                res.status(400).send(err);
            res.status(400).json(artist)   
        });

}

exports.deleteArtist = (req, res, next) => {

    Artist.findOneAndDelete({ identifier: req.params.identifier },
        (err, artist) => {
            if (err)
                res.status(400).send(err);
            res.status(200).send(artist);
        });

}
