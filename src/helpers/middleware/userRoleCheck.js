import User from "../../dao/User.js";

export const checkIfAdmin = async (req, res, next) => {
  const user = new User();
  const findUser = await user.findByID(req?.user?.userId);
  if (!findUser.isAdmin) {
    return res.status(401).json({
      info: "Unauthorized",
      message: "You are not authorized to access this route",
    });
  }
  req.user.role = "ADMIN";
  next();
};

export const isAcountActive = async (req, res, next) => {
  const findUser = await user.findByID(req?.user?.userId);
  if (!findUser?.isActive) {
    return res.status(401).json({
      info: "Unauthorized",
      message: "Your account is temporary inactive",
    });
  }
  next();
};
