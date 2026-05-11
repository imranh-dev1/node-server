import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";



export const productController = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    const services = readProduct()

    if (url?.startsWith("/services") && method === "GET") {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            meassage: "This is service route", services,
        }))
    }
}