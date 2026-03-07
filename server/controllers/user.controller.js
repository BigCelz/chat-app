import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      fullName,
      password: hashedPassword,
    });

    //creating token
    const token = generateToken(newUser._id);
    res.status(201).json({
      success: true,
      userData: newUser,
      token,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    console.log(error.message);
  }
};

//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //creating token
    const token = generateToken(userData._id);
    res.status(200).json({
      success: true,
      userData,
      token,
      message: "User logged in successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    console.log(error.message);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, bio, profilePic } = req.body;
    const userId = req.user._id;

    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (bio) updateData.bio = bio;

    if (profilePic) {
      const upload = await cloudinary.uploader.upload(profilePic);
      updateData.profilePic = upload.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");

    res.status(200).json({
      success: true,
      userData: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error.message);
  }
};
