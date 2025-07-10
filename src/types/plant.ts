import { Types } from 'mongoose';
// import { IEarth } from '../lib/models/Earth';
// import { IMonth } from '../lib/models/Month';


 export type PlantCardProps = {
  plant: {
    id: string;
    name: string;
    background: string;
    description: string;
  };
};


export interface IPlant {
  _id?: Types.ObjectId;
  name: string;
  description: string;
  background: string;
  earth: Types.ObjectId | IEarth;
  seedlingMonths: Types.ObjectId[] | IMonth[];
  harvestMonths: Types.ObjectId[] | IMonth[];
}

export type Plant = {
  _id: string;
  name: string;
  description: string;
  background: string;
  earth: Earth;
  seedlingMonths: Month[];
  harvestMonths: Month[];

}
 
export interface IMonth {
  _id: string;
  name: string;
}
export type Month = { _id: string; name: string };

export interface IEarth {
  _id: string;
  type: string;
}


export type Earth = { _id: string; type: string };