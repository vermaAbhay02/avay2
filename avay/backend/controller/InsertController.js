const UserModel  = require("../models/UserModel");


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }
        const userExist = await UserModel.UserModel.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const user = new UserModel.UserModel({
            name,
            email,
            password,
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.log(err);
    }
};




module.exports = { register }