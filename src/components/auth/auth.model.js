import mongoose from "mongoose";

const userSchema = new Schema({
    email: { type: String, unique: true },
    name: { type: String },
    password: { type: String },
    status: { type: String },
    role_id: { type: String },
    dni: { type: String },
    created_at: { type: Date },
    empresa_id: { type: String, unique: true },
});

userSchema.pre("save", function (next) {
    // Obtén el primer carácter y el último carácter del correo
    const email = this.email;
    const firstChar = email.charAt(0);
    const lastChar = email.charAt(email.length - 1);

    // Obtén la fecha en formato "yyyyMMdd"
    const created_at = this.created_at;
    const year = created_at.getFullYear();
    const month = (created_at.getMonth() + 1).toString().padStart(2, "0");
    const day = created_at.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}${month}${day}`;

    // Obtén los 3 últimos dígitos del DNI
    const dni = this.dni;
    const lastThreeDigits = dni.slice(-3);

    // Combina los valores para formar el idEmpresa
    this.empresa_id = `${firstChar}${formattedDate}${lastChar}${lastThreeDigits}`;

    next();
});

export const User = mongoose.model("User", userSchema, "users");