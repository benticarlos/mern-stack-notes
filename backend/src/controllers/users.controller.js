const userCtrl = {};

const User = require('../models/User');

userCtrl.getUsers = async (req, res) => {
        const users = await User.find();
        res.json(users)
}

userCtrl.createUser = async (req, res) => {
        const {username: username} = req.body;

        const newUser = new User({username});
        await newUser.save();
        // console.log(newUser)
        res.json({message: 'User Created'});
}

userCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    // console.log(user);
    res.json(user)
}

userCtrl.updateUser = async (req, res) => {
    const {username} = req.body;
    await User.findOneAndUpdate({_id: req.params.id}, {
        username
    });
    res.json({message: 'User Updated'})
}

userCtrl.deleteUser = async(req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(req.params.id)
    res.json({message: 'User Deleted'})
}


module.exports = userCtrl;
