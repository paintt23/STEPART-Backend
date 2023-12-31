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

    if (!user) {
      return next(createError("unauthenticated", 401)); //วิ่งไปทำงานที่middleware
    }
    delete user.password;
    req.user = user;
    console.log(req.user);
    next();
  } catch (err) {
    next(err);
  }
};

// const jwt = require("jsonwebtoken");
// module.exports = (req, res, next) => {
//   try {
//     const authorization = req.headers.authorization;
//     if (!authorization) {
//       return resizeBy.status(401).json({ message: "unauthenticated" });
//     }
//     if (!authorization.startsWith(`Bearer `)) {
//       return resizeBy.status(401).json({ message: "unauthenticated" });
//     }
//     //Bearer
//     const token = authorization.split("")[1];
//     //ตรวจสอบถ้าไม่ต้องจะthrow err
//     const payload = jwt.verify(
//       token,
//       process.env.JWT_SECRET_KEY || "very_secret"
//     );
//     next();
//   } catch (err) {
//     next(err);
//   }
// };
