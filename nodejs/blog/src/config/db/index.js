const mongoose = require('mongoose');

async function connect() {
    try {
        // await mongoose.connect('mongodb://localhost:27017/blogs_dev', {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // })
        await mongoose.connect('mongodb://localhost:27017/blogs_dev');
    } catch (error) {
        console.log('Connect failure::', error);
    }
}

module.exports = { connect };
