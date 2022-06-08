const Users = require("../models/Users");

const register = async (req, res, next) => {
  const data = req.body;
  const oldUser = await Users.findOne({ email: data.email });
  if (oldUser) {
    return res
      .status(400)
      .json({ success: false, status: "Та аль хэдийн бүртгүүлсэн байна" });
  }
};
