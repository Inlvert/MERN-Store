module.exports.isAdmin = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: admin only" });
    }

    next();
  } catch (error) {
    next(error);
  }
};
