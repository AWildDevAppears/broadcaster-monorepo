import { Queue, Worker } from "bullmq";
import { ESpeaker, pause, say, stitchAudio } from "./voice/voice.js";
import { saveToBuffer } from "./output/output.js";
import { types, VideographerRequestGenerateVideo, VideographerResponseVideo } from "@awda-bc/lib-types";

async function main() {
    const connection =  types.getBullMQconfig(process.env).connection;

    const responseQueue = new Queue(types.VIDEOGRAPHER_VIDEO_RESPONSE, {
        connection,
    });

    new Worker<VideographerRequestGenerateVideo>(types.VIDEOGRAPHER_GENERATE_VIDEO_REQUEST, async () => {
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

        const response: VideographerResponseVideo = types.videographerResponseVideo.parse({
            variant: types.VIDEOGRAPHER_VIDEO_RESPONSE,
            spec: {
                videoRaw: buffer.toString("base64"),
            }
        });

        responseQueue.add(types.VIDEOGRAPHER_VIDEO_RESPONSE, response);

        return buffer;

    }, {
        connection,
    });
}

main();
