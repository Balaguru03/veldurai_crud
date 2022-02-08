const menuModel = require('../model/menu')
const bluebird = require('bluebird')

module.exports.addingmenu = data => {
    return new bluebird((resolve, reject) => {
        var record = new menuModel(data);
        record.save((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        })
    })
};

module.exports.getmenu = query => {
    return new bluebird((resolve, reject) => {
        menuModel.aggregate([
            {
                $match: {
                    'parentId': null
                }
            },
            {
                $lookup: {
                    from: 'mainmenus',
                    localField: '_id',
                    foreignField: 'parentId',
                    as: 'submenu'
                }
            },
        ]).exec((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        })
    })

}

module.exports.Listmenus = query => {
    return new bluebird((resolve, reject) => {
        menuModel.find({}).populate('parentId').exec((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        })
    })

}

module.exports.getbyid = query => {
    return new bluebird((resolve, reject) => {
        menuModel.findById(query).exec((err, doc) => {
            if (err) { reject(err) }
            else { resolve(doc) }
        })
    })
}

module.exports.update = (query, data) => {
    return new bluebird((resolve, reject) => {
        menuModel.updateOne(query, { $set: data })
            .exec((err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
    })
};

