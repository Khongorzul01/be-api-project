const express = require("express");
const router = express.Router();
const Foods = require("../models/foods");
const Category = require("../models/category");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const { json } = require("express/lib/response");

const getFoodSearchId = (req, res, next) => {
  Foods.findById({ _id: `${req.params.id}` }, function (err, data) {
    if (err) {
      next;
    } else {
      return res.json({ data: data });
    }
  });
};

const getFoodSearchName = (req, res, next) => {
  Foods.find({ name: { $regex: `${req.query.name}` } }, function (err, data) {
    console.log(req.query.name);
    if (err) {
      next;
    } else {
      return res.json({ data: data });
    }
  });
};

// router.get("/foods/search", (req, res) => {});

const getFoods = async (req, res, next) => {
  Foods.find({}, function (err, data) {
    if (err) {
      next;
    } else {
      return res.json({
        data: data,
      });
    }
  });
};

const createFoods = async (req, res, next) => {
  const reqBody = req.body;
  const category = await Category.findById(ObjectId(reqBody.category_id));
  if (category) {
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
      .catch(next);

    res.send("success");
  }
};

const deleteFood = (req, res) => {
  const reqBody = req.body;
  console.log(reqBody);
  let FoodName = {
    name: "Hongorzul",
  };
  Foods.findOneAndDelete({ name: req.body.name }, FoodName, (err, data) => {
    if (err) next;
    res.send("delete");
  });
};

const updateFood = (req, res, next) => {
  const reqBody = req.body;
  console.log(reqBody);
  let updateFood = {
    price: req.body.price,
  };
  Foods.findOneAndUpdate({ name: req.body.name }, updateFood, (err, data) => {
    if (err) next;
    res.send("update yes");
  });
};

module.exports = {
  getFoods,
  createFoods,
  deleteFood,
  updateFood,
  getFoodSearchId,
  getFoodSearchName,
};
