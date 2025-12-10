const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hash,
    });
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await newUser.save();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(201).json({
      message: "User registered successfully",
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const decoded = bcrypt.compare(password, user.password);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(200).json({
      message: "Login successful",
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const googleAuthCallback = async (req, res) => {
  const user = req.user;

  const isUserExists = await userModel.findOne({ 
    $or: [ { googleId: user.id }, { email: user.emails[0].value } ]
  });
  if (!isUserExists) {
    const newUser = new userModel({
      googleId: user.id,
      firstName: user.name.givenName,
      lastName: user.name.familyName,
      email: user.emails[0].value,
    });
    await newUser.save();
    userData = newUser;
  } else {
    userData = isUserExists;
  }
  const token = jwt.sign(
    { id: userData._id, email: userData.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  res.status(200).json({
    message: "Google authentication successful",
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
  });
};

module.exports = {
  userRegister,
  userLogin,
  googleAuthCallback,
};
