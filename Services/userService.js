const bcrypt = require("bcrypt");
const { User } = require("../models/User");

const createUser = async (req, res) => {
  console.log(User); // It should log the Mongoose model object, not 'undefined'

  try {
    const { username, email, password, role, image } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Your email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      image,
      Date: new Date(),
    });

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
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: "Error occurred while fetching users",
      details: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

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

    const updated = await User.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated[0] === 0) {
      return res
        .status(404)
        .json({ error: "User not found or no changes made" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Error occurred while updating the user",
      details: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });

    if (!deleted) {
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
