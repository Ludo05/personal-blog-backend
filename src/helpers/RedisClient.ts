import redis, {RedisError} from "redis";

const client = redis.createClient();

client.on("error", (error: RedisError) => {
    console.error(error);
});


export { client }
