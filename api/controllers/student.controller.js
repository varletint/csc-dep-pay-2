import UserTwo from "../models/user.model.js";

export const getStudents = async (req, res, next) => {
  // if (!req.role === "admin") {
  //   return next(errorHandler(403, "Your are not allowed to see any Student"));
  // }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 50;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await UserTwo.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalUsers = await UserTwo.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await UserTwo.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    const userWithOutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    res.status(200).json({ userWithOutPassword, totalUsers, lastMonthUsers });
  } catch (error) {
    next(error);
  }
};
