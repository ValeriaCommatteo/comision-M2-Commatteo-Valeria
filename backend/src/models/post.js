import { Schema, model } from "mongoose";

const postSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, unique: true, required: true },
    autor: { type: Schema.Types.ObjectId, trim: true, required: true, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }], 
    imageURL: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
  }, { timestamps: true, versionKey: false });

const Post = model( 'Post', postSchema )

export default Post
