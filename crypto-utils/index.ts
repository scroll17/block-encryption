import { Generate } from "./generate";
import { Utils } from "./utils";

export namespace Crypto {
    export function encrypt(data: string, blockSize = data.length > 35 ? 35 : data.length) {
        const base64String = Buffer.from(data).toString('base64')

        const table = Generate.correspondenceTable(base64String.length, 0);

        const chunks = Utils.chunkString(base64String, blockSize);
        const blocks = Generate.blocks(chunks, table);

        return {
            table,
            string: blocks.join('')
        }
    }

    export function decrypt() {

    }
}

const { table, string } = Crypto.encrypt('hello world. its test example', 10);
console.log(' table => ', table)
console.log(' string => ', string)

console.log(' decrypt => ', Buffer.from(string, 'base64').toString('utf8'))