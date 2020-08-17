const route = require('express').Router();
const verifyToken = require('../verifyToken');
const User = require('../model/User');

route.get('/', verifyToken, async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id);
    console.log(user);
    res.json({
        id: 'asdasda',
        title: 'title',
        description: 'description'
    });
})

module.exports = route;