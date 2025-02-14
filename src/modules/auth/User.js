import mongoose from "mongoose";
import argon2 from "argon2";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "CLIENT"], default: "CLIENT" },
}, { timestamps: true });

userSchema.methods.comparePassword = async function (password) {
    return await argon2.verify(this.password, password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password") || !this.password) return next();
    try {
        this.password = await argon2.hash(this.password);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("User", userSchema);
export default User;