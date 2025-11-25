import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { validateEmail, validatePassword } from "../utils/validators.js";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 DEBUG LOGS
    console.log("📥 Incoming email ->", JSON.stringify(email));
    console.log("📩 Is email valid? ->", validateEmail(email));
    console.log("🔐 Incoming password ->", JSON.stringify(password));
    console.log("🔑 Is password valid? ->", validatePassword(password));

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ error: "Weak password" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "User exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    res.json({
      message: "User created",
      userId: user._id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("🔑 LOGIN email:", email);
    console.log("🔑 LOGIN password:", password);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};