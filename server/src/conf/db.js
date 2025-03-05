import mongoose from "mongoose";
import { conf } from "./index.js";

const mongoDB = conf.dbUri;

export const connectDb = async () => {
	try {
		const connect = await mongoose.connect(mongoDB);
        console.log(`Mongodb connected !!! DB Host: ${connect.connection.host}`);
	} catch (error) {
		console.log("Mongodb connection :: Error :: ", error);
	}
};
