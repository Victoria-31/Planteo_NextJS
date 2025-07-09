import { Types } from 'mongoose';

export interface IPlant {
  name: string;
  description: string;
  background: string; 
  earth: Types.ObjectId; 
  seedlingMonths: Types.ObjectId[];
  harvestMonths: Types.ObjectId[];
}
