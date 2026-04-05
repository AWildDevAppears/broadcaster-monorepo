/**
* Copyright (c) AWildDevAppears
*/

import { Queue, Worker } from "bullmq";
import { types, ScriptwriterRequestWriteScript, ScriptwriterResponseScript } from "@awda-bc/lib-types";

async function main() {
    const connection =  types.getBullMQconfig(process.env).connection;

    const responseQueue = new Queue(types.VIDEOGRAPHER_VIDEO_RESPONSE, {
        connection,
    });

    new Worker<ScriptwriterRequestWriteScript>(types.VIDEOGRAPHER_GENERATE_VIDEO_REQUEST, async () => {
        const response: ScriptwriterResponseScript = types.scriptwriterResponseScript.parse({
            variant: types.SCRIPTWRITER_SCRIPT_RESPONSE,
            spec: {
                script: [],
            }
        });

        responseQueue.add(types.VIDEOGRAPHER_VIDEO_RESPONSE, response);

        return;

    }, {
        connection,
    });
}

main();


