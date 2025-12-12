const { v4: uuidv4 } = require("uuid");
const { uploadImage } = require("../services/storage.service");
const userModel = require("../models/user.model");

const updateUserProfile = async (req, res) => {
  try {
    const avatar = req.file;
    let avatarUrl;
    if (avatar) {
      const uploadResponse = await uploadImage(avatar.buffer, `${uuidv4()}`);
      avatarUrl = uploadResponse.url;
    }
    const { firstName, lastName, email, phone, gender } = req.body;
    const userId = req.user.id;
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, phone, gender, avatar: avatarUrl },
      { new: true }
    );
    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        gender: updatedUser.gender,
        avatar: avatarUrl || updatedUser.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId).select("address");
    res.status(200).json({
      message: "Addresses fetched successfully",
      addresses: user.address,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const addAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const {fullName,phone,city,street,state,country,addressType,zip} = req.body;
    
    const user = await userModel.findById(userId);
    user.address.push({
      fullName,
      phone,
      city,
      street,
      state,
      country,
      addressType,
      zip
    });
    await user.save();
    res.status(200).json({
      message: "Address added successfully",
      addresses: user.address,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  updateUserProfile,
  getAddress,
  addAddress,
};
