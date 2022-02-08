const userService = require('../Service/user')

module.exports.listofusers = (req,res) =>{
    userService.getAll().then(DBresponse=>{
        if(DBresponse){
         
            res.status(200).send({
                code:200,
                data:DBresponse
            })
            
        }
       
    }).catch(error=>{
        res.status(400).send({
            code:400,
            error:error
        })
    })
}

module.exports.updaterole = (req,res) =>{
    userService.updateOne({_id:req.params.userid},req.body).then(DBresponse=>{
        if(DBresponse){
            res.status(200).send({
                code:200,
                data:DBresponse
            })
        }
       
    }).catch(error=>{
        res.status(400).send({
            code:400,
            error:error
        })
    })
}