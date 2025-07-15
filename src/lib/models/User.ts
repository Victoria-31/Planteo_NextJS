import { Schema, model, models, Types } from 'mongoose';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  garden: Types.ObjectId[]; 
}

const userSchema = new Schema<IUser>({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  garden: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Plant' }],
    default: [], 
  },
});


export default models.User || model<IUser>('User', userSchema);
