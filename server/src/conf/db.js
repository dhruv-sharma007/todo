import mongoose from "mongoose";
import { conf } from "./index.js";

const mongoDB = conf.dbUri;

export const connectDb = async () => {
	const connect = await mongoose.connect(mongoDB);
	console.log(`Mongodb connected !!! DB Host: ${connect.connection.host}`);
};
