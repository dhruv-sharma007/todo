import mongoose from "mongoose";
import { conf } from "./index";

const mongoDB = conf.dbUri;

const connectDb = async () => {
	try {
		const connect = await mongoose.connect(mongoDB);
        console.log(connect.connection.host)
	} catch (error) {
		console.log("Mongodb connection :: Error :: ", error);
	}
};
