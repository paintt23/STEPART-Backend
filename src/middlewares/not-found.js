module.exports = (req, res, next) => {
  res.status(404).json({ message: "resourc not found on this server" });
};
