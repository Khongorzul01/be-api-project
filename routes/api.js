const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const Foods = require("../models/foods");
const Category = require("../models/category");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const { json } = require("express/lib/response");

// router.get("/users", (req, res) => {
//   Users.find({}, function (err, data) {
//     if (err) {
//       throw err;
//     } else {
//       return res.json({
//         data: data,
//       });
//     }
//   });
// });

router.get("/cats", (req, res) => {
  Cats.find({}, function (err, data) {
    if (err) {
      throw err;
    } else {
      return res.json({ data: data });
    }
  });
});

// router.delete("/users", (req, res) => {
//   const reqBody = req.body;
//   console.log(reqBody);
//   let usersName = {
//     name: "Hongorzul",
//   };
//   Users.findOneAndDelete({ name: req.body.name }, usersName, (err, data) => {
//     if (err) {
//       throw err;
//     } else {
//       res.send("delete");
//     }
//   });
// });

// router.put("/users", (req, res) => {
//   const reqBody = req.body;
//   console.log(reqBody);
//   let updateUser = {
//     email: req.body.email,
//     phone: req.body.phone,
//     password: req.body.password,
//   };
//   Users.findOneAndUpdate({ name: req.body.name }, updateUser, (err, data) => {
//     if (err) {
//       throw err;
//     } else {
//       res.send("update yes");
//     }
//   });
// });

router.post("/cats", (req, res, next) => {
  const reqBody = req.body;
  console.log(reqBody.name);
  let newCats = new Cats({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    color: req.body.color,
  });
  newCats
    .save()
    .then((data) => {
      res.status(201).json({
        message: "Success",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "error",
        data: err,
      });
    });
});

router.get("/foods", (req, res) => {
  Foods.find({}, function (err, data) {
    if (err) {
      throw err;
    } else {
      return res.json({ data: data });
    }
  });
});

router.post("/foods", async (req, res, next) => {
  const reqBody = req.body;
  //   console.log(reqBody.category_id);
  const category = await Category.findById(ObjectId(reqBody.category_id));
  //   console.log(reqBody.name);
  console.log(category);
  if (category) {
    console.log(category);
    let newFoods = new Foods({
      _id: new mongoose.Types.ObjectId(),
      sales: req.body.sales,
      name: req.body.name,
      price: req.body.price,
      portion: req.body.portion,
      stock: req.body.stock,
      image: req.body.image,
      tumb_img: req.body.tumb_img,
      ingredients: req.body.ingredients,
      discount: req.body.discount,
      category: category,
    });
    newFoods
      .save()
      .then((data) => {
        // res.status(201).json({
        //   message: "Success",
        //   data: data,
        // });
      })
      .catch((err) => {
        console.log(err);
        // res.status(500).json({
        //   message: "error",
        //   data: err,
        // });
      });

    res.send("success");
  }
});

module.exports = router;
