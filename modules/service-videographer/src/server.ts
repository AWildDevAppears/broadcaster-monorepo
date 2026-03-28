import { Hono } from "hono";
import { saveToBuffer } from "./output/output.js";
import { say, pause, ESpeaker, stitchAudio } from "./voice/voice.js";
import { stream } from "hono/streaming";

const server = new Hono();

const cache: { currentVideo: Buffer } = {
    currentVideo: Buffer.alloc(0),
}


server.post("/generate", async (c) => {

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

    cache.currentVideo = await saveToBuffer(audioTrack)

});

server.get("/feed", async (c) => {
    if (cache.currentVideo.byteLength === 0) {
        c.body("Video has not been generated", 500)
        return;
    }

        c.header('Content-Type', 'video/mp4');
        c.header('Content-Length', `${cache.currentVideo.byteLength || 0}`);
        c.header('Accept-Ranges', 'bytes');

    return stream(c, async (stream) => {
        const chunkSize = 64 * 1024;

        for (let i = 0; i < cache.currentVideo.length; i += chunkSize) {
            const chunk = cache.currentVideo.subarray(i, i + chunkSize);
            await stream.write(chunk);
        }
    });
})

export const app = server;


