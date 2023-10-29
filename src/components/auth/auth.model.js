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
	storeId: {
        type: String,
		unique: true,
        default: function () {

			const emailPart = this.email.split('@')[0].toUpperCase();
            const firstChar = emailPart.charAt(0);
            const lastChar = emailPart.charAt(emailPart.length - 1);
            const date = this.created_at.toISOString().replace(/[-T:Z.]/g, "").slice(0, 8);
            const lastThreeDigitsDNI = this.dni.slice(-3);
            return firstChar + lastChar + date + lastThreeDigitsDNI;
        },
    },
  
});

export const User = mongoose.model("User", userSchema, "users");
