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

  async signIn(email, password) {
    try {
      const user = await this.userRepository.getByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordCorrect = this.checkPassword(password, user.password);
      if (!isPasswordCorrect) {
        console.log("Passwords do not match");
        throw new Error("Password is incorrect");
      }
      const token = this.createToken({
        email: user.email,
        id: user.id,
      });
      return token;
    } catch (error) {
      console.log("Something went wrong in sign in process");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid token" };
      }
      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "No user with the corresponding token exists" };
      }
      return user.id;
    } catch (error) {
      console.log("Something went wrong in the auth process");
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

  checkPassword(password, encryptedPassword) {
    try {
      const isPasswordCorrect = bcrypt.compareSync(password, encryptedPassword);
      return isPasswordCorrect;
    } catch (error) {
      console.log("Something went wrong in password check");
      throw error;
    }
  }
}

module.exports = UserService;
