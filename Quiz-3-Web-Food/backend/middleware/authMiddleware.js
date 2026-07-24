const jwt = require("jsonwebtoken");

// Middleware untuk memproteksi route Admin Panel (CRUD Menu & kelola Order)
const protect = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Tidak ada token, akses ditolak" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token tidak valid atau kadaluarsa" });
  }
};

module.exports = { protect };
