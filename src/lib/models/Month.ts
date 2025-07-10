import { Schema, model, models} from 'mongoose';
import { IMonth } from '@/types/plant';

const monthSchema = new Schema<IMonth>({
  name: { type: String, required: true },
});

export default models.Month || model<IMonth>('Month', monthSchema);
