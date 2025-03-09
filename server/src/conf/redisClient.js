import redis from "redis";
import { conf } from "./index.js";

const client = redis.createClient({ url: conf.redisUri });

client.on("error", (err) => console.error("Redis Error", err));

client.connect()
    .then(()=>console.log('connected to redis'))
    .catch(console.error)

export default client;