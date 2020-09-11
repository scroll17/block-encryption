export namespace Generate {
    export type CorrespondenceTable = Record<number, number>;

    export function correspondenceTable(arraySize: number, from: number, to = arraySize) {
       const table: CorrespondenceTable = {};
       const uniqueKeys: number[] = [];

       let currentIndex = 0;
       do {
          const key = randomInteger(from, to, uniqueKeys);
          uniqueKeys.push(key);

          table[key] = currentIndex++;
       } while (currentIndex < arraySize)

       return table;
    }

    export function blocks(chunks: Array<string | number>, table: CorrespondenceTable) {
        let blocks: Array<string | number> = [];

        for(const [targetIndex, currentIndex] of Object.entries(table)) {
            blocks[+targetIndex] = chunks[currentIndex];
        }

        return blocks
    }

    function randomInteger(min: number, max: number, uniqueKeys: number[] = []) {
        let isUnique = false;
        let value;

        do {
            value = Math.floor(min + Math.random() * (max + 1 - min));

            if(!uniqueKeys.includes(value)) isUnique = true;
        } while (!isUnique)

        return value;
    }
}