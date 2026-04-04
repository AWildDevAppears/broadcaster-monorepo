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


export const bullMQconfig = {
    name: "broadcaster-controller",
    connection: { host: 'localhost', port: 6379 },
} as const;

// VIDEOGRAPHER
export const videographerRequestGenerateVideo = z.object({
    variant: "videographerRequestGenerateVideo",
    spec: z.object({
        script: z.array(z.string()),
    }),
});

export const videographerResponseVideo = z.object({
    variant: "videographerResponseVideo",
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
