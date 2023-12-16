import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: { type: String, required: true, trim: true },
  email: { type: String, trim: true, unique: true, required: true },
  password: { type: String, trim: true, required: true },
  avatarURL: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false,
})

const User = model( 'User', userSchema )

export default User