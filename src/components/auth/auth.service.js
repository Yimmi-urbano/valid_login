
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {APP_SECRET_ACCESS, APP_SECRET_ACCESS_TIME } from "../../../src/config.js";
import {
	UserInvalidCredentialsError,UserAlreadyRegisteredError
} from "../errors.js";

import {
	registerUserDao,
	getByLoginlUserDao
} from "./auth.dao.js";


export const registerUser = async (email,name,dni,password,role_id, phonecell) => {
	const user = await getByLoginlUserDao(email);
	if (user) {
		throw UserAlreadyRegisteredError;
	}
	const salt = await bcrypt.genSalt();
	const hashedPassword = await bcrypt.hash(password, salt);
	const data={
		email,name,password:hashedPassword,role_id,status:"active",created_at:new Date(),updated_at:new Date(),dni,phonecell:phonecell
	}
	const result = await registerUserDao(data);
	return result
};

export const loginUser = async (email,password) => {
	const user = await getByLoginlUserDao(email);
	if (!user) {
		throw UserInvalidCredentialsError;
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw UserInvalidCredentialsError;
	}
	const token = await jwtCreateToken(email, user.role_id, user.userId, user.name);

	return { token: token, roleId: user.role_id, userId: user.userId,name:user.name };
};

export const jwtCreateToken = async (email, role_id, userId,name ) => {
	const token = jwt.sign(
		{ email: email,  userId: userId ,role_id: role_id, name:name },
		APP_SECRET_ACCESS,
		{
			expiresIn: APP_SECRET_ACCESS_TIME,
		}
	);
	return token;
};

export const verifyUser = async (token) => {
	try {
		const user = await jwt.verify(token, APP_SECRET_ACCESS);
		return user	
	} catch (error) {
		throw new Error('El token no es válido o ha expirado.');
	}
	
};
