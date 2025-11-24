import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },

  email: {
    type: String,
    require: true,
    unique: true
  },

  password: {
    type: String,
    require: true
  },

  createdAt: {
    type: Date,
    default: Date.now 
   },
});

// Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password"))
    return next();
});

// chech password

userSchema.methods.matchPassword = async function (enteredPasswword) {
  return await bcrypt.compare(enteredPasswword, this.password)
};

export default mongoose.model("User", userSchema);