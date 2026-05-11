import type { IncomingMessage, ServerResponse } from "http";

export const productController = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    if (url?.startsWith("/services") && method === "GET") {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            meassage: "This is service route", data: {
                "id": 20,
                "name": "imran",
            }
        }))
    }
}