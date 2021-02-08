const mongoose = require('mongoose');
require('dotenv').config()


mongoose.Promise = global.Promise;

const url = process.env.MONGODB_URI

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});