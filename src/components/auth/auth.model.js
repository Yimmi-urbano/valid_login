import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
	email: { type: String, unique: true },
	name: { type: String },
	password: { type: String },
	status: { type: String },
	role_id: { type: String },
	dni: { type: String },
	created_at: { type: Date },
	updated_at: { type: Date },
});

export const User = mongoose.model("User", userSchema, "users");