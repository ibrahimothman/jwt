const route = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../joiValidation');
const jwt = require('jsonwebtoken');



route.post('/register', async (req, res) => {

    // validate request
    const { error, value } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if the email is aleady in database
    const exiestedEmail = await User.findOne({ email: value.email });
    if (exiestedEmail) return res.status(400).send('email is already existed');

    // hashing password
    const salt = await bcrypt.genSalt(10);
    value.password = await bcrypt.hash(value.password, salt);

    // create new user
    const user = new User(value);
    try {
        const savedUser = await user.save();
        res.send({ user: savedUser._id });
    } catch (error) {
        res.status(400).send(error);
    }

})


route.post('/login', async (req, res) => {
    // validate request
    const { error, value } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if the email exists
    const user = await User.findOne({ email: value.email });
    if (!user) return res.status(400).send('email or password is wrong');

    // compare passwords
    const validPassword = await bcrypt.compare(value.password, user.password);
    if (!validPassword) return res.status(400).send('email or password is wrong');

    // create and assign a token
    const token = await jwt.sign({
        _id: user._id,
        exp: Math.floor(Date.now() / 1000) + 60,
    }, process.env.SECRET_TOKEN);
    res.header('Authorization', token).send({ token });

})
module.exports = route;