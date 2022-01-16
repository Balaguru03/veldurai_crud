const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

module.exports.connect = (callback) => {
    mongoose.connect('mongodb://localhost:27017/Veldurai-crud', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    mongoose.connection.on('connected', () => {
        console.log('--: DB Connected :--');
        callback();
    });

    mongoose.connection.on('error', (error) => {
        console.log('Connection Error: ', error);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('--: DB Disconnected :--');
    });
}