// const _ = require('lodash');
// const mongoose = require('mongoose');
// const UserSchema = require('../api/users/users.model')();


// const config = require('../config/environment');

// exports.getDbConnsFromDbName = connsFromName;


// function connsFromName(cb, res) {
//     //if (!dbName) return cb("dbName should be a string");
//     // console.log(config.db.tenant.PARTIAL_URI + dbName);
//     let connection = mongoose.createConnection(config.db.URI, config.mongo.options);
//     let models = {};
//     models['User'] = connection.model('User', UserSchema);

//     if (res)
//         res.on('finish', (a, b) => {
//             connection.close(() => {
//                 console.log('Destroyed mongoConnection')
//             })
//         })

//     return cb(null, models);
// }