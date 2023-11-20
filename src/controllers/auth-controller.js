const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = require("../modal/prisma");

exports.register = async (req, res, next) => {
  try {
    //validata
    const { firstName, lastName, email, password, Tel } = req.body; //ทำหน้าที่ในการอ่านreq.body
    const hashedPassword = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        Tel,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "success" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    console.log(email);
    const targetUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    console.log(targetUser);
    if (!targetUser) {
      //เช็คว่า หาcustomer เจอในดาต้าเบทไหม
      return res.status(400).json({ message: "invalid credentail" });
    }
    const isMath = await bcrypt.compare(password, targetUser.password);
    if (!isMath) {
      return res.status(400).json({ message: "invalid credentail" });
    }

    const payload = {
      //ใส่ข้อมูลcustomerลงpayload
      id: targetUser.id,
    };

    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "asdfghjklqwertyu",
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    delete targetUser.password;

    res.status(200).json({ message: "success", accessToken, targetUser });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  res.status(200).json({ user: req.user });
};

// exports.register = async (req, res, next) => {
//   try {
//     const { value, error } = registerSchema.validate(req.body);
//     if (error) {
//       return next(error);
//     }
//     value.password = await bcrypt.hash(value.password, 12);
//     const user = await prisma.user.create({
//       data: value,
//     });
//     const payload = { userId: user.id };
//     const accessToken = jwt.sign(
//       payload,
//       process.env.JWT_SECRET_KEY || "1q2w3e4r5t6y7u8i9o0p",
//       {
//         expiresIn: process.env.JWT_EXPIRE,
//       }
//     );
//     delete user.password;
//     res.status(201).json({ accessToken, user });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.login = async (req, res, next) => {
//   try {
//     const { value, error } = loginSchema.validate(req.body);
//     if (error) {
//       return next(error);
//     }
//     console.log(value);
//     // SELECT * FROM user WHERE email = emailOrMobile OR mobile = emailOrMobile
//     const user = await prisma.user.findFirst({
//       where: {
//         email: value.email,
//       },
//     });
//     if (!user) {
//       return next(createError("invalid credential", 400));
//     }

//     const isMatch = await bcrypt.compare(value.password, user.password);
//     if (!isMatch) {
//       return next(createError("invalid credential", 400));
//     }

//     const payload = { userId: user.id };
//     const accessToken = jwt.sign(
//       payload,
//       process.env.JWT_SECRET_KEY || "1q2w3e4r5t6y7u8i9o0p",
//       {
//         expiresIn: process.env.JWT_EXPIRE,
//       }
//     );
//     delete user.password;
//     res.status(200).json({ accessToken, user });
//   } catch (err) {
//     next(err);
//   }
// };
