const mongoose = require('mongoose')
const connect = mongoose.connect('mongodb://localhost:27017/mydb');

connect.then(()=> {
    console.log('Database connected successfully')
})
.catch((err) => {
    console.log(`Database cannot be connected due to ${err}`)
});

const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model('customer-login-details', loginSchema);

module.exports = collection;