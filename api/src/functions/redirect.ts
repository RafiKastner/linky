import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { collections, connectToDatabase } from "../services/database.service";

export async function redirect(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    try {
        connectToDatabase()

        const code = request.query.get('code');
        if (!code) {
            return {
                status: 404,
                body: "Code query cannot be empty"
            }
        }

        const result = await collections.links.findOne({ code: code })
        if (result) {
            context.log(`Redirect function processed request for redirect code "${code}"`);
            return {
                jsonBody: {
                    originalUrl: result.originalUrl
                }
            }
        }

        return {
            status: 404,
            body: `Could not find redirect with given code ${code}`
        }
    } catch(err) {
        throw Error(err)
    }
};

app.http('redirect', {
    methods: ['GET',],
    authLevel: 'anonymous',
    handler: redirect
});
