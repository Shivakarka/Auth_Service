const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({
      message: "User created successfully",
      data: response,
      success: true,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in controller");
    throw error;
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password
    );
    return res.status(200).json({
      message: "User signed in successfully",
      data: response,
      success: true,
      err: {},
    });
  } catch (error) {
    res.status(401).json({
      message: "Authentication failed",
      data: {},
      success: false,
      err: {
        message: error.message,
      },
    });
  }
};

module.exports = {
  create,
  signIn,
};
