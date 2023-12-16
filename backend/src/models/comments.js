import {Schema, model} from "mongoose";

const commentSchema = new Schema(
  {
    autor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true, trim: true //se utiliza para indicar que los espacios en blanco iniciales y finales deben eliminarse antes de guardarse.
   },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }},
  {
    timestamps: true,
    versionKey: false
  }
)

const Comments = model( 'Comments', commentSchema )

export default Comments