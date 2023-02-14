const jwt = require("jsonwebtoken");

exports.generateToken = (userInformation) => {
  if (!userInformation) {
    userInformation = {
      id: Date.now(),
      userEmail: "example@gmail.com",
      password: "1234",
    };
  }

  return jwt.sign({ user: userInformation }, "secretkey");
};

exports.verifyToken = (token) => {
  if (!token) throw new Error("Token is required to verify");

  try {
    return jwt.verify(token, "secretkey");
  } catch (error) {
    throw new Error("Invalid token");
  }
};
