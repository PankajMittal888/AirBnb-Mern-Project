import jwt from "jsonwebtoken";

const IsUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(token);
    
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verify);
    

    if (!verify) {
      return res.status(403).json({ message: "Token verification failed" });
    }

    req.userId = verify.userId;
    next();

  } catch (error) {
    return res.status(400).json({ message: "Error verifying token", error: error.message });
  }
};

export default IsUser;
