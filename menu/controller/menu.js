const menuService = require('../service/menu')
const rolesService = require('../../Roles/service/roles')
module.exports.addmenu = (req, res) => {
    menuService.addingmenu(req.body).then(response => {
        if (response) {
            res.status(200).send({
                code: 200,
                data: response
            })
            let record = {
                menu: [
                    {
                        menuPermission: response._id

                    }]
            }

           rolesService.findOne({name:'Admin'}).then(roleForMenu=>{
            //    console.log(roleForMenu._id)
               rolesService.updateMenuAdmin({_id:roleForMenu._id},record.menu).then(test=>{
                   console.log(test)
               })
           })
        }
        else {
            throw "Unknown error"
        }
    }).catch(error => {
        res.status(400).send({
            code: 400,
            data: error
        })
    })
}

module.exports.getMenus = (req, res) => {
    menuService.getmenu(req.body).then(response => {
        res.status(200).send({
            code: 200,
            data: response
        })
    }).catch(error => {
        res.status(400).send({
            code: 400,
            data: error
        })
    })
}

module.exports.Listmenus = (req, res) => {
    menuService.Listmenus(req.body).then(response => {
        res.status(200).send({
            code: 200,
            data: response
        })
    }).catch(error => {
        res.status(400).send({
            code: 400,
            data: error
        })
    })
}

module.exports.getoneMenu = (req, res) => {
    menuService.getbyid(req.params.id).then(response => {
        res.status(200).send({
            code: 200,
            data: response
        })
    }).catch(error => {
        res.status(400).send({
            code: 400,
            error: error
        })
    })
}

// update menu 

module.exports.updateMenu = (req, res) => {
    menuService.getbyid({ _id: req.params.id }).then(searchResult => {
        if (searchResult) {
            menuService.update({ _id: req.params.id }, req.body).then(updation => {
                res.status(200).send({
                    code: 200,
                    data: "Menu Has been succesfully updated!!"
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

