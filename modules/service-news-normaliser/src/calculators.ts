/**
* Copyright (c) AWildDevAppears
*/

export enum ENewsTheme {
    CONFLICT = "CONFLICT",
    WEATHER = "WEATHER",
    RELIGION = "RELIGION",
    POLITICS = "POLITICS",
    SPORT = "SPORT",
    HEALTH = "HEALTH",
    TECH = "TECH",
    BUSINESS = "BUSINESS",
    MUSIC = "MUSIC",
    EDUCATION = "EDUCATION",
    TV = "TV",
    UNKNOWN = "UNKNOWN",

}

/**
 * Calculate theme
 * Inject the raw words we have for this article and then compare it with our weights.
 */
export function calculateTheme(rawWords: string) {
    const rawWordsLower = rawWords.toLowerCase();

    const score: Record<ENewsTheme, number> = {
        [ENewsTheme.UNKNOWN]: 0,
        [ENewsTheme.CONFLICT]: 0,
        [ENewsTheme.WEATHER]: 0,
        [ENewsTheme.RELIGION]: 0,
        [ENewsTheme.POLITICS]: 0,
        [ENewsTheme.SPORT]: 0,
        [ENewsTheme.HEALTH]: 0,
        [ENewsTheme.TECH]: 0,
        [ENewsTheme.BUSINESS]: 0,
        [ENewsTheme.MUSIC]: 0,
        [ENewsTheme.EDUCATION]: 0,
        [ENewsTheme.TV]: 0
    }

    for (const [themeStr, words] of Object.entries(weightedWords)) {
        const theme = themeStr as ENewsTheme;
        for (const [word, weight] of words) {
            if (rawWordsLower.includes(word)) {
                score[theme] += weight;
            }
        }

        // If we didnt find any words, crush the possibility of this theme being the right one
        // Might remove this later.
        if (score[theme] === 0) {
            score[theme] = -5;
        }
    }

    let mostLikelyTheme = ENewsTheme.UNKNOWN;
    for (const [key, weight] of Object.entries(score)) {
        // If we don't know the theme, take anything that isn't in the negative.
        // if (weight === score[mostLikelyTheme] && mostLikelyTheme === ENewsTheme.UNKNOWN) {
        //     mostLikelyTheme = key as ENewsTheme;
        // }

        if (weight > score[mostLikelyTheme]) {
            mostLikelyTheme = key as ENewsTheme;
            continue;
        }
    }

    return mostLikelyTheme;
}


const weightedWords: Record<ENewsTheme, [string, number][]> = {
    [ENewsTheme.UNKNOWN]: [],
    [ENewsTheme.CONFLICT]: [["arson", 2], ["arrested", 2], ["custody", 2], ["murder", 2], ["weapon", 2], ["gun", 1], ["knife", 1], ["stab", 1], ["stabbing", 2], ["police", 1], ["crime", 1], ["abuse", 1], ["burgle", 1], ["blaze", 1], ["assault", 3], ["punch", 1], ["kick", 1], ["beaten", 1]],
    [ENewsTheme.WEATHER]: [["storm", 1], ["stormed in", -2], ["sunshine", 2], ["showers", 1], ["wind", 1], ["gust", 2], ["disgust", -2], ["snow", 1], ["sleet", 1]],
    [ENewsTheme.RELIGION]: [["archbishop", 2], ["sermon", 2], ["pray", 1], ["spray", -1], ["prayer", 2]],
    [ENewsTheme.POLITICS]: [["parliament", 2], ["house of commons", 2], ["house of lords", 2], ["minister", 1], ["trump", 2], ["israel", 1], ["government", 2], ["brexit", 1], ["deport", 1]],
    [ENewsTheme.SPORT]: [["football", 2], ["tennis", 2]],
    [ENewsTheme.HEALTH]: [["pension", 2], ["medical", 2], ["hospital", 1]],
    [ENewsTheme.TECH]: [["cyber", 2], ["crypto", 2], ["microsoft", 3], ["linux", 5], ["gdpr", 2]],
    [ENewsTheme.BUSINESS]: [],
    [ENewsTheme.MUSIC]: [["rapper", 2], ["musician", 2], ["singer", 2], ["songwriter", 2], ["artist", 1], ["guitarist", 1]],
    [ENewsTheme.EDUCATION]: [["teachers", 1]],
    [ENewsTheme.TV]: [["tv", 2], ["television", 2], ["film", 2], ["reality show", 2], ["reality tv", 2], ["screen", 1], ["on air", 1]]
}
