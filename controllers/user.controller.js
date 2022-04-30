const db = require("./../models");
const isEmail = require("validator/lib/isEmail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

const getCurrentUser = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).send("Unauthorized");
  }
  const user = await db.users.findById(userId);
  if (!user) {
    res.status(401).send("No current User");
  }
  res.status(200).send({ message: "Success get current user", data: user });
};

const createUser = async (req, res) => {
  const body = req.body;
  const user = new db.users({
    username: body.username,
    email: body.email,
    password: body.password,
    dob: body.dob,
  });
  console.log(user);
  const response = await user.save();
  res.status(200).send(response);
};

const getUsers = async (req, res) => {
  const response = await db.users.find();
  res.status(200).send({
    data: response,
    count: response.length,
    message: "Success",
    statusCode: 200,
  });
};

const getUser = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).send("Unauthorized");
  }
  const user = await db.users.findById(userId);
  if (!user) {
    res.status(401).send("No current User");
  }
  res.status(200).send({ message: "Success get current user", data: user });
};

// commondjs      es

// create a model
// define route
// oporations : create, get

const updateUser = (req, res) => {
  // 1.no id :
  //status (400), message : bad request  , missing id
  // 2. has id : res.status(200).send({message:`Update a user :id: `})

  res.status(200).send({ message: `Update a user :id: ` });
};

const deleteUser = (req, res) => {
  // 1.no id :
  //status (400), message : bad request  , missing id
  // 2. has id : res.status(200).send({message:`Delete a user :id: `})

  res.status(200).send({ message: "Delete a user" });
};

const signup = async (req, res) => {
  const { username, email, password, dob, role } = req.body;

  //body empty
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: "cannot empty data submission" });
  }

  //check validate email
  if (!isEmail(email)) {
    return res.status(400).send({ message: "email is unvalid" });
  }

  //6-12 digit
  if (!(password.length > 6 && password.length < 12)) {
    return res
      .status(400)
      .send({ message: "password is required between 6 and 12" });
  }

  //duplicated email
  try {
    const user = await db.users.findOne({ email: email });
    if (user) {
      return res.status(401).send({ message: "this email is already used" });
    }
    const newUser = new db.users({
      username,
      email,
      password: bcrypt.hashSync(password, 8),
      dob,
      role,
    });
    await newUser.save();
    return res.status(200).send({ newUser });
  } catch (error) {
    res.status(500).send({ message: error || "error occured" });
  }
};
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.users.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .send({ message: "no email in system. Please register" });
    }
    const isRightPassword = bcrypt.compareSync(password, user.password);
    if (!isRightPassword) {
      return res.status(401).send({ message: "Password is not match" });
    }
    const payload = { userId: user._id };
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) {
          return res.status(401).send({ error: err });
        }
        res.status(200).send({ data: user, token: token });
      }
    );
  } catch (error) {
    res.status(500).send({ message: error || "error occured" });
  }
};
const signout = async (req, res) => {
  const userId = req.userId;
  const payload = { userId: user._id };
  jwt.sign(
    payload,
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1" },
    (err, token) => {
      if (err) {
        return res.status(401).send({ error: err });
      }
      res.status(200).send({ data: user, token: token });
    }
  );
  res.status(200).send("logout");
};
module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  signup,
  signin,
  signout,
  getCurrentUser,
};
