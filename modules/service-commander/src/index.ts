import { Queue } from "bullmq";


const queue = new Queue("broadcast-controller", {
    connection: { host: 'localhost', port: 6379 },
});

