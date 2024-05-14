import User from "../src/dao/User.js";

export default (async () => {
  // Seeding Admin
  const user = new User();
  const checkDuplicate = await user.findByEmail("chetan@admin.com");

  if (!checkDuplicate) {
    // const password = await hashAndSalt("admin@123");
    await user.create({
      email: "chetan@admin.com",
      username: "adminchetan",
      password : "admin@123",
      isAdmin: true,
    });
    
    console.log("Admin on-board");
  }
})();
