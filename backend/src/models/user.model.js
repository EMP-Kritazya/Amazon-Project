import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minLength: [3, "Too few characters"],
      maxLength: [50, "Too many characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@+\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 50,
    },
  },
  {
    timestamps: true,
  },
);

// before saving,
userSchema.pre("save", async function (next) {
  if (!/^\S+@\S+\.\S+$/.test(this.email)) {
    throw new Error("Invalid Email Format");
  }
  this.email = this.email.toLowerCase();

  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
