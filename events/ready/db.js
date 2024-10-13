const mongoose = require('mongoose');
const mongoURL = process.env.MONGODB_URL;

module.exports = async (client) => {
    if (!mongoURL) return;

    await mongoose.connect(mongoURL || '', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    if (mongoose.connect) {
        console.log('Connected to database');
    } else {
        console.log('Failed to connect to database')
    }
}