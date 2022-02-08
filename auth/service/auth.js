var User=require('.././model/auth')
var  bluebird = require('bluebird')

module.exports.insert = (input) => {
    return new bluebird((resolve, reject) => {
        let record = new User(input);
        record.save((error, doc) => {
            if (error) {
                reject(error);
            } else {
                resolve(doc);
            }
        });
    });
};

module.exports.findOne = query => {
    return new bluebird((resolve, reject) => {
        User.findOne(query)
            .exec((err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
    });
};

module.exports.findById = query => {
    return new bluebird((resolve, reject) => {
        User.findOne(query)
        .populate('Role.RoleId','_id name')
            .exec((error, doc) => {
                console.log(doc)
                if (error) {
                    reject(error);
                } else {
                    resolve(doc);
                }
            });
    });
};