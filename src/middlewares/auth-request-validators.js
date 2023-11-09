const validateUserAuth = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
      data: {},
      success: false,
      err: {},
    });
  }
  next();
};

const validateIsAdminRequest = async (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).json({
      message: "User id is required",
      data: {},
      success: false,
      err: {},
    });
  }
  next();
};

module.exports = {
  validateUserAuth,
  validateIsAdminRequest,
};
