import mongoose, { Schema } from 'mongoose';
import { IEarth } from '../../types/plant';

const earthSchema = new Schema<IEarth>({
  type: { type: String, required: true },
 
}, {
  timestamps: true
});

const Earth = mongoose.models.Earth || mongoose.model<IEarth>('Earth', earthSchema);

export default Earth;