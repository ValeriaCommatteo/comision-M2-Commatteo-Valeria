import User from "../models/user.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../middlewares/verification.js";
import { SECRET } from "../config/config.js";

export const register = async (req, res) => {
  try {
    const { email, password, userName, avatarURL } = req.body;
    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(403).json({ message: "Email already exists" })
    }

    const passwordHash = await bcrypt.hash(password, 10); // hash
    const newObj = { ...req.body }
    newObj.password = passwordHash

    const newUser = await User.create(newObj)
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      avatarURL: newUser.avatarURL,
      createdAt: newUser.createdAt,
      updateAt: newUser.updatedAt
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    res.status(200).json({
      message: "Succesfully logged in", token: req.token,
      user: {
        message: token,
        id: userFound.id,
        userName: userFound.userName,
        email: userFound.email,
        avatarURL: userFound.avatarURL
      }
    })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
export const logout = async (req, res) => {
  try {
    // Elimina el "token"
    res.clearCookie("token");

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const authenticate = async (req, res) => {
  try {
    res.status(200).json({
      message: 'User successfully authenticated',
      token: req.token,
      user: {
        email: req.user.email,
        id: req.user._id
      }
    })
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const profile = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound)
      return res.status(400).json({ message: "User not found" });
    res.json({
      message: "Perfil",
      id: userFound.id,
      userName: userFound.userName,
      email: userFound.email,
      avatarURL: userFound.avatarURL,
      createdAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Profile error", error });
  }
}

const { secret } = SECRET();

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, secret, async (err, user) => {
    if (err) return res.status(401).json({ message: "No autorizado" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "No autorizado" });

    return res.json({
      message: token,
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      avatarURL: userFound.avatarURL,
    });
  });
};