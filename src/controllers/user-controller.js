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

module.exports = {
  create,
};
