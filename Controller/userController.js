const bcrypt = require("bcrypt");
const BaseUser = require("../models/Person"); 
const Manager = require("../models/Manager");
const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { email, firstName, lastName, password, phone, userType, biography } = req.body;

    const existingUser = await BaseUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    if (userType == 'user') {
      newUser = new User({
        email,
        firstName,
        lastName,
        password: hashedPassword,
        phone,
        biography,
      });
    }
    else {
      return res.status(400).json({ error: "Invalid userType" });
    }

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      error: "Error occurred while creating the user",
      details: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
    try {
      const managers = await BaseUser.find({ userType: "User" });
      res.status(200).json(managers);
    } catch (error) {
      res.status(500).json({
        error: "Error occurred while fetching managers",
        details: error.message,
      });
    }
};



const getUserById = async (req, res) => {
  try {
    const user = await BaseUser.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: "Error occurred while fetching the user",
      details: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await BaseUser.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found or no changes made" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({
      error: "Error occurred while updating the user",
      details: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await BaseUser.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Error occurred while deleting the user",
      details: error.message,
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
