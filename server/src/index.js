import app from "./app.js";
import { connectDb } from "./conf/db.js";
import { conf } from "./conf/index.js";

const PORT = conf.port

connectDb()
.then(() => {
	app.listen(PORT, () => {
		console.log("Server started on http://localhost:8000");
	});
})
.catch((err)=>{
	console.log(err)
})
