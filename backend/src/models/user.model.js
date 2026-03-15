import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowerCase: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
      match: [/^\S+@+\S+\.\S+$/, "Please use a valid email address"],
    },
  },
  {
    timestamps: true,
  },
);

// before saving,
userSchema.pre("save", async function () {
  if (!/^\S+@\S+\.\S+$/.test(this.email)) {
    return next(new Error("Invalid Email Format"));
  }
  this.email = this.email.toLowerCase();
});

export const User = mongoose.model("User", userSchema);
