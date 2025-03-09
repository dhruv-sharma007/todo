import redisClient from "../conf/redisClient.js"
import asyncHandler from "../utils/AsyncHandler.js";

const setCache = asyncHandler( async(key, value, expireTime)=>{
    await redisClient.set(key, JSON.stringify(value), { EX: expireTime })
}) 

const getCache = async (key) =>{
    try{
        const data = await redisClient.get(key)
        if(data){
            return JSON.parse(data);
        }
        return null;
    } catch(err){
        console.error("Error while getting cahe :", err)
        return null;
    }
}

export {
    setCache,
    getCache
}