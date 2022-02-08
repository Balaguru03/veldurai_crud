const bluebird = require('bluebird')
const userModel = require('../../auth/model/auth')

module.exports.getAll = (query = {} )=>{
    return new bluebird((resolve,reject)=>{
        userModel.find(query).select('_id firstName lastName userName email mobile Role').populate('Role.RoleId','_id name')
        .exec((err,doc)=>{
            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        })
    })
}

module.exports.updateOne = (query,data)=>{
    return new bluebird((resolve,reject)=>{
        userModel.updateOne(query,{$set:data}).exec((err,doc)=>{
            if(err){
                reject(err)
            }else{
                resolve(doc)
            }
        })
    })
}