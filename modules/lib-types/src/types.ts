/**
* Copyright (c) AWildDevAppears
*/

import { z } from "zod";

// News
export const normalisedNewsEntry = z.object({
    headline: z.string(),
    body: z.array(z.string()),
});
export type NormalisedNewsEntry = z.infer<typeof normalisedNewsEntry>;


// Commander Commands
export const EChannelID = z.enum([
    "CHANNEL_ID_NEWS"
])
export type EChannelID = z.infer<typeof EChannelID>;

export const COMMAND_CHANNEL_SWITCH = "commandChannelSwitch";
export const commandChannelSwitch = z.object({
    variant: z.literal(COMMAND_CHANNEL_SWITCH),
    spec: z.object({
        channelId: EChannelID
    }),
});
export type CommandChannelSwitch = z.infer<typeof commandChannelSwitch>;

export const commandChannel = z.discriminatedUnion("variant", [
    commandChannelSwitch
]);
export type CommandChannel = z.infer<typeof commandChannel>;

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

export const VIDEOGRAPHER_GENERATE_VIDEO_REQUEST = "videographerRequestGenerateVideo";
export const videographerRequestGenerateVideo = z.object({
    variant: z.literal(VIDEOGRAPHER_GENERATE_VIDEO_REQUEST),
    spec: z.object({
        script: z.array(z.string()),
    }),
});
export type VideographerRequestGenerateVideo = z.infer<typeof videographerRequestGenerateVideo>;

export const VIDEOGRAPHER_VIDEO_RESPONSE = "videographerResponseVideo";
export const videographerResponseVideo = z.object({
    variant: z.literal(VIDEOGRAPHER_VIDEO_RESPONSE),
    spec: z.object({
        videoRaw: z.string(),
    }),
});
export type VideographerResponseVideo = z.infer<typeof videographerResponseVideo>;

// NEWS NORMALISER
export const NEWS_NORMALISER_CONSUME_REQUEST = "newsNormaliserRequestConsume";
export const newsNormaliserRequestConsume = z.object({
    variant: z.literal(NEWS_NORMALISER_CONSUME_REQUEST),
    spec: z.object({}).optional(),
});
export type NewsNormaliserRequestConsume = z.infer<typeof newsNormaliserRequestConsume>;


export const NEWS_NORMALISER_NEWS_RESPONSE = "newsNormaliserResponseNews";
export const newsNormaliserResponseNews = z.object({
    variant: z.literal(NEWS_NORMALISER_NEWS_RESPONSE),
    spec: z.object({
        stories: z.array(normalisedNewsEntry)
    })
})
export type NewsNormaliserResponseNews = z.infer<typeof newsNormaliserResponseNews>;

// SCRIPTWRITER
export const SCRIPTWRITER_WRITE_SCRIPT_REQUEST = "scriptwriterRequestWriteScript";
export const scriptwriterRequestWriteScript = z.object({
    variant: z.literal(SCRIPTWRITER_WRITE_SCRIPT_REQUEST),
    spec: z.object({
        stories: z.array(normalisedNewsEntry),
    }),
})
export type ScriptwriterRequestWriteScript = z.infer<typeof scriptwriterRequestWriteScript>;

export const SCRIPTWRITER_SCRIPT_RESPONSE = "scriptwriterResponseScript";
export const scriptwriterResponseScript = z.object({
    variant: z.literal(SCRIPTWRITER_SCRIPT_RESPONSE),
    spec: z.object({
        script: z.array(z.string()),
    }),
});
export type ScriptwriterResponseScript = z.infer<typeof scriptwriterResponseScript>;

// CHANNEL HOPPER
export const CHANNEL_HOPPER_SWITCH_REQUEST = "channelHopperRequestSwitch";
export const channelHopperRequestSwitch = z.object({
    variant: z.literal(CHANNEL_HOPPER_SWITCH_REQUEST),
    spec: z.object({
        channelId: EChannelID,
    }),
});
export type ChannelHopperRequestSwitch = z.infer<typeof channelHopperRequestSwitch>;

export const CHANNEL_HOPPER_SET_VIDEO_REQUEST = "channelHopperRequestSetVideo";
export const channelHopperRequestSetVideo = z.object({
    variant: z.literal(CHANNEL_HOPPER_SET_VIDEO_REQUEST),
    spec: z.object({
        videoRaw: z.string(),
    }),
});
export type ChannelHopperRequestSetVideo = z.infer<typeof channelHopperRequestSetVideo>;
