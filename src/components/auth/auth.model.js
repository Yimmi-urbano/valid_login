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
    idEmpresa: {
        type: String,
		unique: true,
        default: function () {
            // Obtén el primer carácter y el último carácter del correo
            const firstChar = this.email.charAt(0);
            const lastChar = this.email.charAt(this.email.length - 1);

            // Obtén la fecha sin separadores en formato YYYYMMDD
            const date = this.created_at.toISOString().replace(/[-T:Z.]/g, "").slice(0, 8);

            // Obtén los 3 últimos dígitos del DNI
            const lastThreeDigitsDNI = this.dni.slice(-3);

            // Combina los componentes para formar el idEmpresa
            return firstChar + lastChar + date + lastThreeDigitsDNI;
        },
    },
});

export const User = mongoose.model("User", userSchema, "users");
