import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const { name, socialHandle } = req.body;

    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "Please upload at least one image" });
    }

    // Create array of image paths
    const imageUrls = req.files.map((file) => file.filename);

    const user = new User({
      name,
      socialHandle,
      images: imageUrls,
    });

    await user.save();
    res.status(201).json({
      message: "User created successfully",
      user,
      imageUrls,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};
