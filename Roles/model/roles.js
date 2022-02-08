const mongoose = require('mongoose')
const permissions = {
    menuPermission:{
        type:mongoose.Types.ObjectId,
        ref:'Mainmenus'
    },
    hasAccess:{
            isReadable:{
                type:Boolean,
                default:false
            },
            isCreatebale:{
                type:Boolean,
                default:false
            },
            isEditable:{
                type:Boolean,
                default:false
            },
            isDownloadable:{
                type:Boolean,
                default:false
            }
        }
} 
const Roles = new mongoose.Schema({
    name:{
        type:String
    },
    menu:[permissions]
    // creadtedAt:{
    //     type:Date,
    //     default:Date.now
    // }
})

module.exports = mongoose.model('Roles',Roles)