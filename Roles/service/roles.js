var rolesModel = require('../model/roles')
var menumodel = require('../../menu/model/menu')
var bluebird = require('bluebird')
const { reject } = require('bluebird')

function createsubmenu(doc, parentId = null) {
    // let finalData = []
    let menuList = []
    // console.log(doc)
    let menus;
    if (parentId == null) {
        menus = doc[0].menu.filter(cat => {
            return cat.menuPermission.parentId == undefined
        })
    } else {
        menus = doc[0].menu.filter(cat => {
            return JSON.stringify(cat.menuPermission.parentId) == JSON.stringify(parentId)
        })
    }

    for (let processMenu of menus) {
        menuList.push({


            menuPermission: {
                _id: processMenu.menuPermission._id,
                menuName: processMenu.menuPermission.menuName,
                url: processMenu.menuPermission.url,
                hasAccess: processMenu.hasAccess,
                submenu: createsubmenu(doc, processMenu.menuPermission._id)

            }

        })
    }

    return menuList
}

module.exports.insert = data => {
    return new bluebird((resolve, reject) => {
        var record = new rolesModel(data);
        record.save((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        })
    })
};

module.exports.findOne = (query = {}) => {
    return new bluebird((resolve, reject) => {
        rolesModel.findOne(query).populate("menu.menuPermission")
            .exec((err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
    });
};

module.exports.getAll = query => {
    return new bluebird((resolve, reject) => {
        rolesModel.find({}).populate("menu.menuPermission").exec((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        })
    })
}

module.exports.getRoleById = (query = {}) => {
    return new bluebird((resolve, reject) => {
        rolesModel.findById(query).populate('menu.menuPermission')
            .exec((err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            })
    })
}

// Update
module.exports.update = (query, data) => {
    return new bluebird((resolve, reject) => {
        rolesModel.updateOne(query, { $set: data })
            .exec((err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
    })
};

//menu update for admin
module.exports.updateMenuAdmin = (query, data) => {
    return new bluebird((resolve, reject) => {
        rolesModel.updateOne(query,{ $addToSet: { menu: data } })
            .exec((err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
    })
};
module.exports.insertRole = (query, data) => {
    return new bluebird((resolve, reject) => {
        // console.log(query)
        rolesModel.updateOne(query, { $addToSet: { menu: data } })
            .exec((err, doc) => {
                if (err) {
                    reject(err);
                } else {

                    resolve(doc);
                }
            });
    });
};
module.exports.updatemenu = (query,data,options) => {
    return new bluebird((resolve, reject) => {
        // console.log(query)
        rolesModel.updateOne(query, { $set: { "menu.$[menus].hasAccess": data } },options)
            .exec((err, doc) => {
                if (err) {
                    reject(err);
                } else {

                    resolve(doc);
                }
            });
    });
};
module.exports.accessmenu = query => {
    return new bluebird((resolve, reject) => {
        rolesModel.find(query).populate('menu.menuPermission').exec((err, doc) => {

            if (err) {
                reject(err);
            } else {
                const menuactions =
                {
                    _id: doc[0]._id,
                    name: doc[0].name,
                    menu: createsubmenu(doc)
                }

                resolve(menuactions);
            }
        })
    })
}

module.exports.updateall = (query,data) =>{
    return new bluebird((resolve,reject)=>{
        console.log()
        rolesModel.updateMany(query,{ $addToSet: { menu: data } }).exec((err, doc) => {

            if (err) {
                reject(err);
            } else {
               

                resolve(doc);
            }
        })
    })
    
}