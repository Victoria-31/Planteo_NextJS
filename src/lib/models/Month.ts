import { Schema, model, models } from 'mongoose';

export interface IMonth {
  name: string;
}

const monthSchema = new Schema<IMonth>({
  name: { type: String, required: true },
});

export default models.Month || model<IMonth>('Month', monthSchema);
