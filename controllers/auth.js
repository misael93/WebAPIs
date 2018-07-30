var jwt = require('jsonwebtoken');
var authConfig = require('../config/auth');

const generateToken = (user) => {
    return jwt.sign(user, authConfig.secret, {
        expiresIn: "100d"
    });
}

const setUserInfo = (request) => {
    return {
        _id: request._id,
        email: request.email,
        role: request.role
    };
}

exports.register = (req, res, next) => {

    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;

    if(!email){
        return res.status(422).send({error: 'You must enter an email address'});
    }

    if(!password){
        return res.status(422).send({error: 'You must enter a password'});
    }

    var user = {
      email:email,
      password:password,
      name:name
    }

    var userInfo = setUserInfo(user);

    res.status(201).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    })

}
