import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  console.log("AUTH HEADER:", authHeader);

  let token = authHeader;

  // If header starts with "Bearer "
  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  console.log("EXTRACTED TOKEN:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT ERROR:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}