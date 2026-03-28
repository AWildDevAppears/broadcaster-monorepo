import { serve } from "@hono/node-server";
import { app } from "./server.js";

async function main() {
    serve(app)
}

main();
