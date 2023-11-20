const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");
const prisma = require("../modal/prisma");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(createError("unauthenticated", 401));
    }

    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || "mnbvcxz");

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    console.log("admin in coming", user);
    if (!user) {
      return next(createError("unauthenticated", 401)); //วิ่งไปทำงานที่middleware
    }

    if (user.role !== "ADMIN") {
      return next(createError("unauthenticated", 401));
    }
    delete user.password;
    req.user = user;
    console.log(req.user);
    next();
  } catch (err) {
    next(err);
  }
};
