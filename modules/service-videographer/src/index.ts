import { Queue, Worker } from "bullmq";
import { ESpeaker, pause, say, stitchAudio } from "./voice/voice.js";
import { saveToBuffer } from "./output/output.js";
import { types } from "@awda-bc/lib-types";

async function main() {
    const connection =  types.getBullMQconfig(process.env).connection;

    const responseQueue = new Queue("videographerResponseVideo", {
        connection,
    });

    new Worker("videographerRequestGenerateVideo", async () => {
        const audioTrack = await stitchAudio([
            say("Hello World"),
            pause(1.5),
            say("This is a test of the audio"),
            say("stitcher"),
            pause(1.5),
            say("If this works correctly, we should get a video file that contains this text spoken by our bot"),
            pause(1.5),
            say("We should also have different voices available to us", ESpeaker.MALE_HOST)
        ]);

        const buffer =  await saveToBuffer(audioTrack);

        responseQueue.add("videographerResponseVideo", {
            variant: "videographerResponseVideo",
            spec: {
                videoRaw: buffer.toString("base64"),
            }
        })

        return buffer;

    }, {
        connection,
    });
}

main();
