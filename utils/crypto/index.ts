import { Generate } from "./generate";
import { Utils } from "./utils";

export namespace Crypto {
    export interface AppData {
        nick?: string;
        rsa?: {
            publicKey: string,
            privateKey: string
        }
    }

    export function encrypt(data: string, blockSize = 1) {
        const base64String = Buffer.from(data).toString('base64')

        const chunks = Utils.chunkString(base64String, blockSize);

        const table = Generate.correspondenceTable(chunks.length, 0);
        const blocks = Generate.blocks(chunks, table);

        return { table, blockSize, encryptedString: blocks.join('') }
    }

    export function decrypt(data: string, table: Generate.CorrespondenceTable, blockSize: number) {
        const chunks = Utils.chunkString(data, blockSize);

        let decryptedBlocks: Array<string | number> = [];
        for(const [currentIndex, targetIndex] of Object.entries(table)) {
            decryptedBlocks[+targetIndex] = chunks[+currentIndex];
        }

        const decryptedString = decryptedBlocks.join('');
        return Buffer.from(decryptedString, 'base64').toString('utf-8')
    }
}
