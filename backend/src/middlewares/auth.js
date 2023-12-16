import jwt from "jsonwebtoken";
import { SECRET } from "../config/config.js";

const { secret } = SECRET();

export const tokenAuth = (req, res, next) => {
  //Autenticación con JWT 
  let { token } = req.cookies

  if (!token) {
    return res.status(401).json({ message: "Authorization denied, no token provided" })
  }

  try {
    let user = jwt.verify(token, secret)
    req.user = user
    next() // Pasa al siguiente middleware o ruta

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" })
    } else {
      return res.status(403).json({ message: "Invalid token" })
    }
  }
}
