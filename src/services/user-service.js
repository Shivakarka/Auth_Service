const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserRepository = require("../repository/user-repository");
const { JWT_KEY } = require("../config/serverConfig");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in UserService");
      throw error;
    }
  }

  createToken(user) {
    try {
      const token = jwt.sign(user, JWT_KEY, { expiresIn: "1h" });
      return token;
    } catch (error) {
      console.log("Something went wrong in tokien creation");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const user = jwt.verify(token, JWT_KEY);
      return user;
    } catch (error) {
      console.log("Something went wrong in token verification", error);
      throw error;
    }
  }
}

module.exports = UserService;
