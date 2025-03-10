import redisClient from "../conf/redisClient.js"
import asyncHandler from "../utils/AsyncHandler.js";

const setCache = asyncHandler( async(key, value, expireTime)=>{
    try{

        await redisClient.set(key, JSON.stringify(value), { EX: expireTime })
    } catch(err){
        console.error("Error while setting cache :", err)
    }
}) 

const getCache = async (key) =>{
    try{
        const data = await redisClient.get(key)
        if(data){
            return JSON.parse(data);
        }
        return false;
    } catch(err){
        console.error("Error while getting cache :", err)
        return false;
    }
}

const removeCache = async (key) =>{
    try{
        const data = getCache(key);
        if(data){
            redisClient.del(key);
            return true;
        };
        return false;
    }catch(err){
        console.error("Error while deleting cache :", err)
    }
}

export {
    setCache,
    getCache,
    removeCache
}