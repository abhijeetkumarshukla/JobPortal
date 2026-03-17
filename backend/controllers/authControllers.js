const  jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const UserModel = require('../models/userModel');

const userRegister = async (req, res) => {

    const { name, email, password, role } = req.body;
    try {

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
       if (err){
        res.status(500).json("getting error while hashing the password");
       }
         const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            role
        });
        await newUser.save();
        res.status(201).send({
        message: `Congratulations ${name} you are registered`,
        "User": newUser,
      });

    })
 } catch (error) {
    res.status(500).json({ message: "Error occurred while registering user" });
 }

}

 const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    bcrypt.compare(password, user.password, (err, result) => {

      if (err) {
        return res.status(500).json({
          message: "Error occurred while comparing passwords"
        });
      }

      if (result) {

        const token = jwt.sign(
          {
            email: user.email,
            role: user.role,
            userID: user._id
          },
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        );

        res.status(200).json({
          message: `Congratulations ${user.name}, you are logged in`,
          token: token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });

      } else {

        res.status(401).json({
          message: "Invalid credentials"
        });

      }

    });

  } catch (error) {

    res.status(500).json({
      message: "Error occurred while logging in",
      error: error.message
    });

  }
};
module.exports = { userRegister, userLogin };
   