/**
* Copyright (c) AWildDevAppears
*/

import { parsers } from "./consumers";


export async function normaliseFeeds() {
    const rawArticles = await Promise.all(parsers.map((parser) => parser.normalise()));

    console.log(rawArticles)
}
