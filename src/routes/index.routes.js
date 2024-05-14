import authRoutes from "./auth.routes.js";
import adminRoutes from "./admin.routes.js"
import userRoutes from "./users.routes.js";

const initilize = (app) => {
  app.use("/auth", authRoutes);
  app.use("/admin", adminRoutes);
  app.use("/users", userRoutes);
};

export default initilize;
