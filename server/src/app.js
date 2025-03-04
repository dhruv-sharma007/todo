import express from "express"

const PORT = 8000;
const app = express();

app.post('/', (req, res)=>{
    res.send("MESSAGE FROM SERVER")
})

export default app