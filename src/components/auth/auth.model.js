import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, unique: true },
	storeId: {
        type: String,
		unique: true,
        default: function () {
            const firstChar = this.email.charAt(0);
            const lastChar = this.email.charAt(this.email.length - 1);
            const date = this.created_at.toISOString().replace(/[-T:Z.]/g, "").slice(0, 8);
            const lastThreeDigitsDNI = this.dni.slice(-3);
            return firstChar + lastChar + date + lastThreeDigitsDNI;
        },
    },
    name: { type: String },
    password: { type: String },
    status: { type: String },
    role_id: { type: String },
    dni: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date },
  
});

export const User = mongoose.model("User", userSchema, "users");
