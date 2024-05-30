/* module here is   src/index.js   */

const express = require('express');
const path = require('path');
const collection = require('./config');
const { exists } = require('fs');
const bcrypt = require('bcrypt');


const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: false}))

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('Login')
});


app.get('/Signup', (req, res) => {
    res.render('Signup')
});

app.get('/Home', (req, res) => {
    res.render('Signup')
});


//register user
app.post('/Signup', async (req, res) => {

    const data = {
        name: req.body.name,
        password: req.body.password
    }


    //user already exist
    const existingUser = await collection.findOne({name: data.name});

    if(existingUser){
        res.send('User already exists. Please, choose a different username')
    } else {
        //hashing password using bcrypt
        const saltRounds = 10; //no of salt round for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; //replacing password with hashedPassword

        const userdata = await collection.insertMany(data);
        console.log(userdata)
    }
   
})

//login user
app.post('/Login', async (req, res) => {
    try {
        const check = await collection.findOne({name: req.body.name});
        if(!check) {
            res.send('user cannot be found')
        };

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);

            if(isPasswordMatch) {
                res.render('Home');
            } else {
                res.send('wrong password');
            }
       
        
    } catch(err) {
       res.send('wrong details')
       console.log(err)
    };
});


app.listen(5000, () => {
    console.log('server started on port:', 5000);
});

