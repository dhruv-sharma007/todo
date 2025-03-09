import dotenv from "dotenv"

dotenv.config()

export const conf = {
    accessToken: process.env.ACCESS_TOKEN,
    accessTokenExpiry: process.env.acessRokenEXPIRY,
    refreshToken: process.env.REFRESH_TOKEN,
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,
    port: process.env.PORT,
    dbUri: process.env.MONGODB_URI,
    redisUri: process.env.REDISURI,
}
