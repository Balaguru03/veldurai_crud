const mongoose = require('mongoose')

const menu = new mongoose.Schema({
    menuName: {
        type: String
    },
    url: {
        type: String
    },
    active: {
        type: Boolean
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mainmenus'
    },
    // hasAccess:{
    //     isReadable:{
    //         type:Boolean
    //     },
    //     isCreatebale:{
    //         type:Boolean
    //     },
    //     isEditable:{
    //         type:Boolean
    //     },
    //     isDownloadable:{
    //         type:Boolean
    //     }
    // }
})

module.exports = mongoose.model('Mainmenus', menu)