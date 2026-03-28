import { spawn } from "child_process";
import { Readable } from "stream";


export async function saveToBuffer(audioBuffer: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const ffmpeg = spawn("ffmpeg", [
            "-y",
            "-f", "s16le", "-ar", "24000", "-ac", "1", "-i", "pipe:0",
            "-f", "lavfi", "-i", "color=c=black:s=1280x720:r=30",
            "-c:v", "libx264", "-tune", "stillimage", "-preset", "ultrafast",
            "-c:a", "aac", "-shortest",
            "-f", "mp4",
            "-movflags", "frag_keyframe+empty_moov",
            "pipe:1"
        ]);

        const chunks: Buffer[] = [];

        const audioStream = new Readable();
        audioStream.push(audioBuffer);
        audioStream.push(null);
        audioStream.pipe(ffmpeg.stdin);

        ffmpeg.stdout.on("data", (chunk) => chunks.push(chunk));

        ffmpeg.on("close", (code) => {
            if (code === 0) resolve(Buffer.concat(chunks));
            else reject(new Error("FFmpeg render failed"));
        });
    });
}

