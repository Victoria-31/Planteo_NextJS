
import { Schema, model, models } from 'mongoose';
import { IPlant } from '../../types/plant'; 


const plantSchema = new Schema<IPlant>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    description: { type: String },
    background: { type: String, required: true }, 
    earth: { type: Schema.Types.ObjectId, ref: 'Earth', required: true },
    seedlingMonths: [{ type: Schema.Types.ObjectId, ref: 'Month' }],
    harvestMonths: [{ type: Schema.Types.ObjectId, ref: 'Month' }],
  },
  { timestamps: true }
);

export default models.Plant || model<IPlant>('Plant', plantSchema);
