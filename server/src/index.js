import app from "./app.js";
import "dotenv/config";
import { connectDb } from "./conf/db.js";

connectDb().then(() => {
	app.listen(8000, () => {
		console.log("Server started on http://localhost:8000");
	});
});
