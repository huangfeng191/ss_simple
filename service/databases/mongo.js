

var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/mystock';
    // DB_URL = 'mongodb://ff:fengfeng123!@101.132.39.57:3335/mystock?authSource=admin'; 

/**
 * 连接
 */
mongoose.connect(DB_URL,{useMongoClient:true});

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;


