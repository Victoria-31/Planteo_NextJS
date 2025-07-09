import { Schema, model, models } from 'mongoose';

export interface IEarth {
  type: string;
}

const earthSchema = new Schema<IEarth>({
  type: { type: String, required: true },
});

export default models.Earth || model<IEarth>('Earth', earthSchema);
