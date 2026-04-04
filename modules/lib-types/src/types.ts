/**
* Copyright (c) AWildDevAppears
*/

import { z } from "zod";

// News
export const normalisedNewsEntry = z.object({
    headline: z.string(),
    body: z.array(z.string()),
});


// Commander Commands
export const EChannelID = z.enum([
    "CHANNEL_ID_NEWS"
])

export const commandChannelSwitch = z.object({
    variant: "commandChannelSwitch",
    spec: z.object({
        channelId: EChannelID
    }),
});

export const commandChannel = z.discriminatedUnion("variant", [
    commandChannelSwitch
]);

/*
 * BULLMQ Requests
 */


export function getBullMQconfig(env: Record<string, string | undefined>) {
    return {
        name: "broadcaster-controller",
        connection: env.REDIS_HOST ? { host: env.REDIS_HOST, port: 6379 } : { host: env.REDIS_HOST || 'localhost', port: 6379 },
    };
}

// VIDEOGRAPHER

export const VIDEOGRAPHER_GENERNATE_VIDEO_REQUEST = "videographerRequestGenerateVideo";
export const videographerRequestGenerateVideo = z.object({
    variant: VIDEOGRAPHER_GENERNATE_VIDEO_REQUEST,
    spec: z.object({
        script: z.array(z.string()),
    }),
});

export const VIDEOGRAPHER_VIDEO_RESPONSE = "videographerResponseVideo";
export const videographerResponseVideo = z.object({
    variant: VIDEOGRAPHER_VIDEO_RESPONSE,
    spec: z.object({
        videoRaw: z.string(),
    }),
});

// NEWS NORMALISER
export const newsNormaliserRequestConsume = z.object({
    variant: "newsNormaliserRequestConsume",
    spec: z.object({}).optional(),
});


export const newsNormaliserResponseNews = z.object({
    variant: "newsNormaliserResponseNews",
    spec: z.object({
        stories: z.array(normalisedNewsEntry)
    })
})

// SCRIPTWRITER
export const scriptwriterRequestWriteScript = z.object({
    variant: "scriptwriterRequestWriteScript",
    spec: z.object({
        stories: z.array(normalisedNewsEntry),
    }),
})

export const scriptwriterResponseScript = z.object({
    variant: "scriptwriterResponseScript",
    spec: z.object({
        script: z.array(z.string()),
    }),
});

// CHANNEL HOPPER
export const channelHopperRequestSwitch = z.object({
    variant: "channelHopperRequestSwitch",
    spec: z.object({
        channelId: EChannelID,
    }),
});

export const channelHopperRequestSetVideo = z.object({
    variant: "channelHopperRequestSetVideo",
    spec: z.object({
        videoRaw: z.string(),
    }),
});
