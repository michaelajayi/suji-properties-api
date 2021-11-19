const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Visitor = require("../models/Visitor");

// @route           // POST /api/visitors/add
// @desc            // Add a visitor
// @access          // Public
router.post(
  "/",
  [
    check("name", "Please add a name").not().isEmpty(),
    check("email", "Please add a valid email").isEmail(),
    check("phone")
      .not()
      .isEmpty()
      .withMessage("Phone is required")
      .bail()
      .isMobilePhone()
      .withMessage("Please include a valid number")
      .bail()
      .isLength({
        min: 11,
        max: 11,
      })
      .withMessage("Phone should 11-digit"),
  ],
  async (req, res) => {
    const { name, email, phone } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let visitor = await Visitor.findOne({ email });
      if (visitor) {
        return res.status(400).json({ msg: "Visitor profile exists" });
      }

      visitor = await Visitor.findOne({ phone });
      if (visitor) {
        return res.status(400).json({ msg: "Visitor profile exists" });
      }

      visitor = new Visitor({
        name,
        email,
        phone,
      });

      await visitor.save();
      return res.status(200).json({ visitor });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route       GET /api/visitors
// @desc        Get all visitors
// @access      Private
router.get("/", auth, async (req, res) => {
  const visitors = await Visitor.find();
  return res.json(visitors);
});
module.exports = router;
