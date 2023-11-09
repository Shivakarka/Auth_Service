const ValidationError = require("../utils/validation-error");
const { User, Role } = require("../models");
const ClientError = require("../utils/client-error");
const { StatusCodes } = require("http-status-codes");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      console.log("Something went wrong in UserRepository");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log("Something went wrong in UserRepository");
      throw error;
    }
  }

  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["id", "email"],
      });
      if (!user) {
        throw new ClientError(
          "AttributeNotFound",
          "Invalid user id sent in the request",
          "Please check the user id and try again",
          StatusCodes.NOT_FOUND
        );
      }
      return user;
    } catch (error) {
      console.log("Something went wrong in UserRepository");
      throw error;
    }
  }

  async getByEmail(email) {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw new ClientError(
          "AttributeNotFound",
          "Invalid email sent in the request",
          "Please check the email and try again",
          StatusCodes.NOT_FOUND
        );
      }
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });
      return user.hasRole(adminRole);
    } catch (error) {
      console.log("Something went wrong in UserRepository");
      throw error;
    }
  }
}

module.exports = UserRepository;
