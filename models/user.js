const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");
const { generateToken } = require("../services/authentication");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profilePic: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    role: {
      type: String,
      enum: ["Admin", "Author", "Reader"],
      default: "Reader",
    },
  },
  { timestamps: true },
);

//Hash password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

//Compare password
// userSchema.methods.comparePassword = async function(candidatePassword) {
//     const isMatch = await bcrypt.compare(candidatePassword, this.password);
//     if (!isMatch) {
//         throw new Error('Invalid password');
//     }
// };
userSchema.static(
  "validateCredentialsAndGenerateToken",
  async function ({ username, password }) {
    const user = await this.findOne({ username }).select("+password");

    if (!user) {
      throw new Error("Invalid username or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid username or password");
    }

    const token = generateToken(user);

    return token;
  },
);

const User = model("User", userSchema);

module.exports = User;
