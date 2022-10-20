const express = require("express");
const router = express.Router();
const members = require("../../Members");
const Joi = require("joi"); //input validation module

// Get All Members
router.get("/", (req, res) => {
  res.send(members);
});

// Get Single Members
router.get("/:id", (req, res) => {
  const member = members.find(
    (member) => member.id === parseInt(req.params.id)
  );

  if (!member) {
    return res
      .status(400)
      .json({ msg: `No member with the id of ${req.params.id}` });
  }
  res.json(member);
});

// Create Member
router.post("/", (req, res) => {
  if (!req.body.name || req.body.name < 3 || !req.body.email) {
    return res.status(400).json({ msg: `Please include a name and email` });
  }
  const member = {
    id: members.length + 1,
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  members.push(member);
  res.redirect("/");
  res.json(members);
});

// Update Member
router.put("/:id", (req, res) => {
  const member = members.find(
    (member) => member.id === parseInt(req.params.id)
  );
  if (!member) {
    return res
      .status(400)
      .json({ msg: `No member with the id of ${req.params.id}` });
  }

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.required(),
  });
  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  member.name = req.body.name;
  member.email = req.body.email;

  res.json({ msg: "Member Updated", member });
});

// Delete Product
router.delete("/:id", (req, res) => {
  const member = members.find(
    (member) => member.id === parseInt(req.params.id)
  );

  if (!member) {
    return res
      .status(400)
      .send({ msg: `No member with the id of ${req.params.id}` });
  }

  const index = members.indexOf(member);

  members.splice(index, 1);
  res.send({ msg: "Member deleted", members });
});

module.exports = router;
