const createError = require("../utils/create-validator");
const prisma = require("../modal/prisma");

exports.createCoures = async (req, res, next) => {
  try {
    const { ...value } = req.body;
    value.price = +value.price;
    value.numberOfPeople = +value.numberOfPeople;

    await prisma.course.create({
      data: value,
    });
    res.status(201).json({ message: "created" });
  } catch (error) {
    next(error);
  }
};

exports.createOrder = async (req, res, next) => {
  const { ...value } = req.body;
  value.courseId = +value.courseId;
  value.userId = req.user.id;
  try {
    const findOrder = await prisma.course.findFirst({
      where: {
        courseId: value.courseId,
      },
    });
    if (findOrder.numberOfPeople < 5) {
      const order = await prisma.order.create({
        data: value,
      });
      res.status(200).json(order);
    }
  } catch (error) {
    next(error);
  }
};

exports.getCoures = async (req, res, next) => {
  try {
    const couresItem = await prisma.course.findMany();

    res.status(200).json({ couresItem });
  } catch (error) {
    next(error);
  }
};

exports.deleteCoures = async (req, res, next) => {
  try {
    const { couresId } = req.params;

    const couresItem = await prisma.course.delete({
      where: {
        id: +couresId,
      },
    });
    res.status(200).json({ couresItem });
  } catch (error) {
    next(error);
  }
};
