const bcrypt = require("bcrypt");
const prisma = require("../model/prisma");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    //validata
    const { firstName, lastName, Tel, email, password, confirmPassword } =
      req.body; //ทำหน้าที่ในการอ่านreq.body
    const hashedPassword = await bcrypt.hash(password, 12);
    await prisma.customer.create({
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
    const { email, password } = req.body;
    const targatCus = await prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (!targatCus) {
      //เช็คว่า หาcustomer เจอในดาต้าเบทไหม
      return res.status(400).json({ message: "invalid credentail" });
    }
    const isMath = await bcrypt.compare(password, targatCus.password);
    if (!isMath) {
      return res.status(400).json({ message: "invalid credentail" });
    }

    const parload = {
      //ใส่ข้อมูลcustomerลงpayload
      id: targatCus.id,
    };

    const accessToken = jwt.sign(
      parload,
      process.env.JWT_SECRET_KEY || "asdfghjklqwertyu",
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    res.status(200).json({ message: "success", accessToken });
  } catch (err) {
    next(err);
  }
};

// const brcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { registerSchema, loginSchema } = require("../validators/auth-validator");
// const prisma = require("../model/prisma");
// const createError = require("../utils/create-validator");

// exports.register = async (req, res, next) => {
//   try {
//     const { value, error } = registerSchema.validate(req.body);

//     if (error) {
//       return next(error);
//     }
//     console.log(process.env.JWT_SECRET_KEY);
//     value.password = await brcrypt.hash(value.password, 12); //salt หน่วงไว้12
//     // console.log(value);
//     const customer = await prisma.customer.create({
//       data: value,
//     });
//     const payload = { customerId: customer.id };
//     const accessToken = jwt.sign(
//       payload,
//       process.env.JWT_SECRET_KEY || "asdfghjklqwertyu",
//       { expiresIn: process.env.JWT_EXPIRE }
//     );
//     res.status(201).json({ accessToken });
//     console.log(value);
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
//     const customer = await prisma.customer.findFirst({
//       where: {
//         OR: [{ email: value.email }],
//       },
//     });
//     console.log(customer);
//     if (!customer) {
//       return next(createError("invalid credential", 400));
//     }
//     const payload = { customerId: customer.id };
//     const accessToken = jwt.sign(
//       payload,
//       process.env.JWT_SECRET_KEY || "asdfghjkertyui",
//       {
//         expiresIn: process.env.JWT_EXPIRE,
//       }
//     );
//     res.status(200).json({ accessToken });
//   } catch (err) {
//     next(err);
//   }
// };
