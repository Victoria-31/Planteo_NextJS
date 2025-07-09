import mongoose from "mongoose";

declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

type Plant = {
  id: string;
  name: string;
  description?: string;
  words?: string;
  background: string;
  earth: string; 
  seedlingMonths: string[];
  harvestMonths: string[];
};