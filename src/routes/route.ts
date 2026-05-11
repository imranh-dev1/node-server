import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/product.controller";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
    // console.log(req)
    const url = req.url;
    const method = req.method;

    if (url === "/" && method === "GET") {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ meassage: "This is root route" }))
    } else if (url?.startsWith("/services") && method === "GET") {
        productController(req, res)
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ meassage: "Route not found" }))
    }
} 