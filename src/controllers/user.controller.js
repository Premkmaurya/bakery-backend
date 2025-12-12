const { v4: uuidv4 } = require("uuid");
const { uploadImage } = require("../services/storage.service");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

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

const updateAddress = async (req, res) => {
  // Implementation for updating an address can be added here
  const userId = req.user.id;
  const { addressId } = req.params;
  const { fullName, phone, city, street, state, country, addressType, zip } = req.body;
  try {
    const user = await userModel.findById(userId);
    const address = user.address.id(addressId);
    address.set({
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
      message: "Address updated successfully",
      addresses: user.address,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    
    const user = await userModel.findByIdAndUpdate(
      userId,
      { $pull: { address: { _id: id } } },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({
      message: "Address deleted successfully",
      addresses: user.address,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updatePassword = async (req, res) => {
  // Implementation for updating password can be added here
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await userModel.findById(userId).select("password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }
    const hash = await bcrypt.hash(newPassword, 10);
    user.password = hash;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  }
  catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}


module.exports = {
  updateUserProfile,
  getAddress,
  addAddress,
  updateAddress,
  deleteAddress,
  updatePassword
};
