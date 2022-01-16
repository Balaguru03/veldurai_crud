var connect_to_database_thorugh_servicefile = require('./crud.service');
var bluebird = require('bluebird');

module.exports.createOperation = (req, res) => {

    // req and res were the argument
    // req and res should be follow the same order req=> will be the first argument, res=> second argument
    // req => request coming from the ui body 
    // res=> response back to the request from UI
    // req.body is the parameter passing to the service file check the service file and search for the insert function there

    connect_to_database_thorugh_servicefile.insert(req.body).then( data_posted_in_db=> {
        if (data_posted_in_db) {
            res.status(200).send({
                code: 200,
                data: data_posted_in_db
            })
        }
    }).catch(error => {
        res.status(400).send({
            code: 400,
            error: error
        })
    })
}


module.exports.list_of_data = (req, res) => {
    connect_to_database_thorugh_servicefile.getAllEntryfromDB(req.body).then(response => {
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

module.exports.specific_data_or_one_data = (req, res) => {
    let filterOption ={
        _id : req.params.id
    }
    connect_to_database_thorugh_servicefile.getSpecificData(filterOption).then(response => {
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

module.exports.delete_data = (req, res) => {
    let data_to_delete ={
        _id : req.params.id
    }
    connect_to_database_thorugh_servicefile.deleteOne(data_to_delete).then(response => {
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


module.exports.update = (req, res) => {
    connect_to_database_thorugh_servicefile.getSpecificData({ _id: req.params.id }).then(searchResult => {
        if (searchResult) {
            connect_to_database_thorugh_servicefile.update_data({ _id: req.params.id }, req.body).then(updation => {
                res.status(200).send({
                    code: 200,
                    data: updation
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
            error: error
        })
    })
}
