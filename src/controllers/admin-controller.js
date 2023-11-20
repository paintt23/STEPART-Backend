const createError = require("../utils/create-validator");
const prisma = require("../modal/prisma");

exports.createCourse = async (req, res, next) => {
  try {
    console.log(req.body);
    res.status(200).json({ msg: "ok" });
  } catch (error) {
    next(error);
  }
};
