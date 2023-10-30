import { registerUser,loginUser,verifyUser } from "./auth.service.js";
import {
	validateUser,
} from "./auth.validation.js";
export const registerUserHandler = async (req, res, next) => {
  try {
    const {email,name,dni,password,role_id,phonecell} = req.body;
    const verifiedUser = validateUser({ email,name,dni,password,role_id,phonecell })
    if (!verifiedUser.valid) {
			return res.status(400).json({ errors: verifiedUser.errors });
		}
    const newUser = await registerUser(email,name,dni,password,role_id,phonecell);    
    return res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const loginUserHandler = async (req, res, next) => {
  try {
    const {email,password} = req.body;
    const login = await loginUser(email,password);    
    return res.status(200).json(login);
  } catch (err) {
    next(err);
  }
};

export const verifyUserdHandler = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ message: "Unauthorized" });
		}
    const token = authHeader.slice(7);
    const login = await verifyUser(token);    
    return res.status(200).json(login);
  } catch (err) {
    next(err);
  }
};

