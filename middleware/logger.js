const moment = require('moment');
//create a middleware - any time we make a request it's runnig middleware
const logger =(req, res, next)=>{
    console.log(`${req.protocol}://${req.get('host')}:${req.originalUrl}:${moment().format()}`);
    next();
}

module.exports = logger;
