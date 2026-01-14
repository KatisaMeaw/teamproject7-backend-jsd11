import { User } from "./users.model.js";

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await User.findById(id).select("-password");

    if (!doc) {
      return res.status(404).json({
        success: false,
        error: "User not found...",
      });
    }

    return res.status(200).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to get a user...",
    });
  }
};
//💚
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to get users...",
    });
  }
};
//💚
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "User not found...",
      });
    }

    return res.status(200).json({
      success: true,
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to delete user...",
    });
  }
};
//💚
export const createUser = async (req, res) => {
  const { name, email, mobileNumber, dob, password } = req.body;

  if (!name || !email || !mobileNumber || !dob || !password) {
    return res.status(400).json({
      success: false,
      error: "Please provide all the details above.",
    });
  }
  try {
    const doc = await User.create({ name, email, mobileNumber, dob, password });

    const safe = doc.toObject();
    delete safe.password;

    return res.status(201).json({
      success: true,
      data: safe,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: "Email already in use!",
      });
    }

    return res.status(500).json({
      success: false,
      error: "Failed to create user...",
    });
  }
};
//💚
export const updateUser = async (req, res) => {
  const { id } = req.params;

  //const body = req.body;
  const {
    fullName,
    nickName,
    gender,
    country,
    language,
    timeZone
  } = req.body;

const updateData = {
  ...(fullName && { name: fullName}),
  nickName,
  gender,
  country,
  language,
  timeZone

};

  try {
    const updated = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        error: "User not found...",
      });
    }

    const safe = updated.toObject();
    delete safe.password;

    return res.status(200).json({
      success: true,
      data: safe,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: "Email already in use!",
      });
    }

    return res.status(500).json({
      success: false,
      error: "Failed to update user...",
    });
  }
};
