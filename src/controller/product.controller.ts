import type { IncomingMessage, ServerResponse } from "http";
import { readProduct, writeProduct } from "../service/product.service";
import type { Tproduct } from "../types/product.type";
import { bodyParser } from "../utility/body.parser";



export const productController = async (req: IncomingMessage, res: ServerResponse) => {
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
            meassage: "This is products route", products,
        }))

    } else if (method === "GET" && id !== null) {
        const products = readProduct()
        // console.log(products)
        const product = products.find((p: Tproduct) => p.id === id)
        // console.log(product)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            meassage: "This is one products route", product,
        }))

    } else if (url === "/products" && method === "POST") {
        const products = readProduct()
        const newProduct = await bodyParser(req);
        // console.log(body)
        products.push(newProduct)
        writeProduct(products)

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            meassage: "product created sucsessfully",
            newProduct: newProduct
        }))
    } else if (method === "PUT" && id !== null) {
        const products = readProduct()
        const updatedProductData = await bodyParser(req);

        const index = products.findIndex((p: Tproduct) => p.id === id)
        // console.log(index)
        // console.log(products[index])
        if (index < 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                meassage: "product not found..!",
                product: null,
            }))
        }
        products[index] = { id: products[index].id, ...updatedProductData }
        // console.log(products[index])
        writeProduct(products)

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            meassage: "product updated sucsessfully",
            updatedProduct: products[index]
        }))
    } else if (method === "DELETE" && id !== null) {
        const products = readProduct()
        const index = products.findIndex((p: Tproduct) => p.id === id)
        console.log(index)
        // console.log(products[index])
        if (index < 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                meassage: "product not found..!",
                product: null,
            }))
        }

        products.splice(index, 1)
        // console.log(products)
        writeProduct(products)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            meassage: "product Deleted sucsessfully",
            deletdProduct: null
        }))
    }
}