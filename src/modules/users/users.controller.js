import { User } from "./users.model.js";

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const doc = await User.findById(id).select("-password");

    if (!doc) {
      const error = new Error("User not found");
      return next(error);
    }

    return res.status(200).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    error.status = 500;
    error.name = error.name || "DatabaseError";
    error.message = error.message || "Failed to get a user";
    return next(error);
  }
};
//💚
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return next(error);
  }
};
//💚
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      const error = new Error("User not found");
      return next(error);
    }

    return res.status(200).json({
      success: true,
      data: null,
    });
  } catch (error) {
    return next(error);
  }
};
//💚
export const createUser = async (req, res, next) => {
  const { name, email, mobileNumber, dob, password } = req.body;

  if (!name || !email || !mobileNumber || !dob || !password) {
    const error = new Error("All field are required");
    error.name = "ValidationError";
    error.status = 400;

    return next();
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
      error.status = 409;
      error.name = "DuplicateKeyError";
      error.message = "Email already in use";
    }

    error.status = 500;
    error.name = error.name || "DatabaseError";
    error.message = error.message || "Failed to create a user";

    return next(error);
  }
};
//💚
export const updateUser = async (req, res, next) => {
  const { id } = req.params;

  //const body = req.body;
  const { fullName, nickName, gender, country, language, timeZone } = req.body;

  const updateData = {
    ...(fullName && { name: fullName }),
    nickName,
    gender,
    country,
    language,
    timeZone,
  };

  try {
    const updated = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      const error = new Error("User not found...");
      return next(error);
    }

    const safe = updated.toObject();
    delete safe.password;

    return res.status(200).json({
      success: true,
      data: safe,
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(error);
    }

    return next(error);
  }
};
