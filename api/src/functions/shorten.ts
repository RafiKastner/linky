import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { collections, connectToDatabase, disconnectFromDatabase } from "../services/database.service";
import { createLinkCode } from "../handlers/id";

const redirect_route = 'c';

export async function shorten(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        const abortSignal = context.extraInputs.get('abortSignal') as AbortSignal
        if (abortSignal) {
            abortSignal.addEventListener("abort", async () => {
                console.log("Host shutting down. Aborting...")
                await disconnectFromDatabase()
                console.log("Successfully disconnected from database. Abort complete.")
            })
        }

        await connectToDatabase();

        const originalUrl = request.query.get('url');
        if (!originalUrl) {
            return {
                status: 404,
                body: "Url query cannot be empty"
            }
        }

        let result = await collections.links.findOne({ originalUrl: originalUrl });
        if (result) {
            context.log(`Shorten function processed request for url "${originalUrl}"`);
            return {
                jsonBody: { 
                    shortUrl: `${process.env.SITE_DOMAIN}/${redirect_route}/${result.code}`
                }
            } 
        }

        const docCount = (await collections.links.countDocuments()) as number
        const maxCodeCharacters = Math.max(2, docCount.toString().length)

        let code = createLinkCode(maxCodeCharacters);

        while (await collections.links.findOne({ code: code })) {
            code = createLinkCode(maxCodeCharacters)
        }

        collections.links.insertOne({
            originalUrl: originalUrl,
            code: code,
            createdAt: new Date(),
            clicks: 0
        })
        
        context.log(`Shorten function processed request for url "${request.url}"`);
        return {
            jsonBody: { 
                shortUrl: `${process.env.SITE_DOMAIN}/${redirect_route}/${code}`
            } 
        };

    } catch (error) {    
        throw Error(error);
    }
};

app.http('shorten', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: shorten
});
