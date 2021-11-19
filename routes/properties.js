const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Property = require("../models/Property");

// @route       POST /api/properties
// @desc        Add a property
// @access      Public
router.post(
  "/",
  [
    check("title", "Please include a title").not().isEmpty(),
    check("price", "Please enter a valid amount").isNumeric(),
    check(
      "description",
      "Description must be a maximum of 5 character"
    ).isLength({ max: 5 }),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, price, description, location } = req.body;

    try {
      let property = Property.findOne({ title });

      if (property) {
        return res.json({ msg: "Property already exist" });
      }

      property = new Property({
        title,
        price,
        description,
        location,
      });

      await property.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route           GET /api/properties
// @desc            Get all properties
// @access          Private
router.get("/", async (req, res) => {
  const properties = await Property.find();
  return res.json(properties);
});

module.exports = router;
