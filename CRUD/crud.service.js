const database_model_to_push = require('./crud.model')
const bluebird = require('bluebird')

module.exports.insert = data_from_controller => { 

    // data_from_controller is the argument

    return new bluebird((resolve, reject) => {
        var record = new database_model_to_push(data_from_controller);
        record.save((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        })
    })
};


module.exports.getAllEntryfromDB = query => {
    return new bluebird((resolve, reject) => {
        database_model_to_push.find({}).exec((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        })
    })

}

module.exports.getSpecificData = query => {
    return new bluebird((resolve, reject) => {
        database_model_to_push.findOne(query).exec((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        })
    })

}

module.exports.deleteOne = (query) => {
    return new bluebird((resolve, reject) => {
        database_model_to_push.deleteOne(query)
            .exec((err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
    })
};

module.exports.update_data = (query, data) => {
    return new bluebird((resolve, reject) => {
        database_model_to_push.updateOne(query, { $set: data })
            .exec((err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
    })
};