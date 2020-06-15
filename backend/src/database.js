const mongoose = require('mongoose');
const app = require('./app');

const URI = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : 'mongodb://mern:Carlos2019*@localhost:27017/mernstack';
// console.log(URI);
mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('[OK] Database is connected on port ', app.get('dbport'));
});
