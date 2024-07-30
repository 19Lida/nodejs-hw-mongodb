import { env } from '../utils/env.js';
import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  try {
    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Error while setting up mongo connection', error);
    throw error;
  }
};

// import mongoose from "mongoose";

// async function initMongoConnection() {
//   try {
//     await mongoose.connect(
//       `mongodb+srv://lida19melnyk:XIuwqVszmJFFKAny@cluster0.t4wqq5l.mongodb.net/`
//     );
//     console.log("Mongo connection successfully established!");
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }
// export { initMongoConnection };
