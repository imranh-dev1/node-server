import path from "path"
import fs from "fs"
import type { Tproduct } from "../types/product.type"

const filePath = path.join(process.cwd(), "./src/database/db.json")

export const readProduct = () => {
    // console.log(process.cwd())
    const products = fs.readFileSync(filePath, "utf-8")
    // console.log(products)
    // console.log(JSON.parse(products))
    return JSON.parse(products);
}

export const writeProduct = (productData: Tproduct) => {
    fs.writeFileSync(filePath, JSON.stringify(productData))
}