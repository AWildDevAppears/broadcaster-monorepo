export enum ESpeaker {
    MALE_HOST = "casual_male",
    FEMALE_HOST = "casual_female",
}

const VOICE_GENERATOR = process.env.VLLM_URL || "http://localhost:8000";

export async function say(message: string, speaker: ESpeaker = ESpeaker.FEMALE_HOST) {
    const response = await fetch(`${VOICE_GENERATOR}/v1/audio/speech`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "mistralai/Voxtral-4B-TTS-2603",
                input: message,
                voice: speaker,
                response_format: "pcm",
            })
        });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`vLLM Error: ${errorBody}`);
    }

    // Get the raw bytes
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);

}

export async function pause(seconds: number) {
    const sampleRate = 24000;
    const bitDepth = 16;
    const channels = 1;
    const bufferSize = (sampleRate * seconds) * (bitDepth / 8) * channels;

    return Buffer.alloc(bufferSize);
}


export async function stitchAudio(messages: Promise<Buffer>[]) {
    const buffers = await Promise.all(messages);
    return Buffer.concat(buffers);
}
