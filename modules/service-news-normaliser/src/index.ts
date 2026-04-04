/**
* Copyright (c) AWildDevAppears
*/

import { Queue, Worker } from "bullmq";
import { types } from "@awda-bc/lib-types";

async function main() {
    const connection =  types.getBullMQconfig(process.env).connection;

    const responseQueue = new Queue(types.NEWS_NORMALISER_NEWS_RESPONSE, {
        connection,
    });

    new Worker(types.NEWS_NORMALISER_CONSUME_REQUEST, async () => {



        const response = types.newsNormaliserResponseNews.parse({
            variant: types.NEWS_NORMALISER_NEWS_RESPONSE,
            spec: {
                stories: [],
            }
        });

        responseQueue.add(types.VIDEOGRAPHER_VIDEO_RESPONSE, response);
    }, {
        connection,
    });
}

main();
