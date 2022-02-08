const Bluebird = require('bluebird')
var roleservice = require('../service/roles')
const menuService = require('../../menu/service/menu')
const mongoose = require('mongoose')

module.exports.roleAdd = (req, res) => {
    roleservice.findOne(req.body).then(searchResult => {
        if (searchResult) {
            throw "Already this role was added"
        }
        roleservice.insert(req.body).then(rolesadded => {
            if (rolesadded) {
                res.status(200).send({
                    code: 200,
                    data: "The role was created successfully!"
                })

                menuService.getmenu().then(menuList => {
                    for (let menu of menuList) {
                        let record = {
                            menu: [
                                {
                                    menuPermission: menu._id

                                }]
                        }
                        roleservice.updateall({ _id: rolesadded._id }, record.menu)
                    }
                })

            }
        }).catch(error => {
            res.status(400).send({
                code: 400,
                error: error
            })
        })
    }).catch(error => {
        res.status(400).send({
            code: 400,
            error: error
        })
    })
}

// getALL roles

module.exports.getAll = (req, res) => {
    roleservice.getAll({}).then(rolesData => {
        res.status(200).send({
            code: 200,
            data: rolesData
        })
    }).catch(error => {
        res.status(400).send({
            code: 400,
            error: error
        })
    })
}

// Update Role

module.exports.updateRole = (req, res) => {
    roleservice.findOne({ _id: req.params.id }).then(searchResult => {
        if (searchResult) {
            roleservice.update({ _id: req.params.id }, req.body).then(updation => {
                console.log(updation)
                res.status(200).send({
                    code: 200,
                    data: "Role Has been succesfully updated!!"
                })
            }).catch(error => {
                res.status(400).send({
                    code: 400,
                    error: error
                })
            })
        }
        else {
            throw "No records found"
        }
    }).catch(error => {
        res.status(400).send({
            code: 400,
            error: "No records found"
        })
    })
}

// getByID

module.exports.getById = (req, res) => {
    roleservice.findOne({ _id: req.params.id }).then(roleData => {
        if (roleData) {
            res.status(200).send({
                code: 200,
                data: roleData
            })
        }
        else {
            throw "Role was not exists"
        }
    }).catch(error => {
        res.status(400).send({
            code: 400,
            error: error
        })
    })
}

module.exports.set = (req, res) => {
    const options = {
        arrayFilters: [
            {
                "menus._id": req.body.menu[0].menuPermission,
            },
        ],
    };
    roleservice.updatemenu({ _id: req.body.roleId, "menu._id": req.body.menu[0].menuPermission }, req.body.menu[0].hasAccess, options).then(response => {
        // console.log(response)
        res.status(200).send({
            code: 200,
            data: response
        })
    })
        .catch(error => {
            res.status(400).send({
                code: 400,
                error: error
            })
        })

}

module.exports.access = (req, res) => {
    roleservice.accessmenu(mongoose.Types.ObjectId(req.params.id)).then(response => {
        res.status(200).send({
            data: response
        })
    })
}

module.exports.initialrole = (req, res) => {
    console.log('hi')
    roleservice.getAll({}).then(rolesData => {
        
        if (rolesData.length == 0) {
            roleservice.insert({ name: 'Admin' }).then(rolesadded => {
                if (rolesadded) {
                  

                    menuService.getmenu().then(menuList => {
                        for (let menu of menuList) {
                            let record = {
                                menu: [
                                    {
                                        menuPermission: menu._id

                                    }]
                            }
                            roleservice.updateall({ _id: rolesadded._id }, record.menu)
                        }
                    })

                }
            }).catch(error => {
                console.log(error)
            })
        }
    })

}