var bcrypt = require('bcrypt');
var users = require('.././service/auth');
var bluebird = require('bluebird');
const jwt = require('jsonwebtoken');
//register
module.exports.signup = (req, res) => {
    return bluebird.all([
        users.findOne({ email: req.body.email })
    ]).spread(EmailExists => {
        if (EmailExists) {
            throw "Email is already existing!. Try another.";
        }
        else {
            return bcrypt.hash(req.body.password, 10)
                .then(convertedHash => {
                    let record = req.body;
                    record.password = convertedHash;
                    return users.insert(record)
                });
        }
    }).then(record => {
        res.json({
            code: 200,
            status: 'success',
            data: record
        });
    }).catch(error => {
        res.status(400).send({
            code: 400,
            status: 'error',
            error: error
        });
    })
}

//login

module.exports.signin = (req, res) => {
    users.findOne({ email: req.body.email })
        .then(userExist => {
            if (!userExist) {
                throw "Invalid Email or password"
            }
            else {
                bcrypt.compare(req.body.password, userExist.password)
                    .then(passwordMatched => {
                        if (!passwordMatched) {
                            throw "Invalid Email or password"
                        } else {
                            console.log(userExist._id)
                            const payload = {
                                user: {
                                    id: userExist._id
                                }
                            }
                            jwt.sign(payload, "randomString", { expiresIn: 3600 }, (err, token) => {
                                if (err) throw err;
                                res.send({
                                    code:200,
                                    data:token
                                });
                            })
                        }
                    }).catch(error => {
                        res.status(401).send({
                            code: 401,
                            status: 'error',
                            error: error
                        });
                    })
            }
        }).catch(error => {
            res.status(401).send({
                code: 401,
                status: 'error',
                error: error
            });
        })
}

//verify token
module.exports.verifytoken = (req, res, next) => {
    const token = req.header("token");
    if (!token) return res.status(401).send({ message: "Please Login to use this feature" });

    try {
        const decoded = jwt.verify(token, "randomString");
        console.log(decoded.user)
        req.user = decoded.user;
        next();
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Invalid Token" });
    }
};

// getusers

module.exports.users = (req, res) => {
// req.
    users.findById({_id:req.user.id}).then(userdetails => {
        console.log(userdetails)
        let userrecord = userdetails
        userrecord.password = ''
        res.json({
            code: 201,
            status: 'success',
            data: userrecord
        });
    }).catch(error => {
        res.json({
            code: 400,
            status: 'error',
            error: error
        });
    })
}
