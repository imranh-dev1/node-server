import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import type { Tproduct } from "../types/product.type";



export const productController = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    const urlParts = url?.split('/')
    // console.log(urlParts)
    const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
    // console.log(id)

    const products = readProduct()

    if (url === "/products" && method === "GET") {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            meassage: "This is services route", products,
        }))
    } else if (method === "GET" && id !== null) {
        const products = readProduct()
        // console.log(products)
        const product = products.find((p: Tproduct) => p.id === id)
        // console.log(product)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            meassage: "This is one service route", product,
        }))
    } else if (url === "/products" && method === "POST") {

    }
}