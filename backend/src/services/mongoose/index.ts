import mongoose from 'mongoose';

async function connectDb(uri: string) {
  const connect = await mongoose.connect(uri);
  return connect;
}

export { connectDb };
