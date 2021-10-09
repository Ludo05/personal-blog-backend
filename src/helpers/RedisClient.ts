import redis, {RedisError} from "redis";

const client = redis.createClient({ host:'redis', port: 6379 });

client.on("error", (error: RedisError) => {
    console.error(error);
});


export { client }
