const express = require("express");
const { userRegister, userLogin } = require("../controllers/authControllers");

const userRouter = express.Router();

userRouter.post('/register', userRegister);
userRouter.post('/login', userLogin);



module.exports = userRouter;