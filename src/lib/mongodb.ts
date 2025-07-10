import mongoose from "mongoose";

type MongooseCache = {
  conn: mongoose.Connection | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached = global.mongoose ?? {
  conn: null,
  promise: null,
};

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URI!, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  const mongooseInstance = await cached.promise;
  cached.conn = mongooseInstance.connection;
  global.mongoose = cached;

  return cached.conn;
}
