export namespace Utils {
    export function chunkString(str: string, num: number): string[] {
        const chunks = str.match(new RegExp('(.|[\r\n]){1,' + Math.round(num) + '}', 'g'));

        if(chunks === null) throw new Error('Chunked is null.')
        return chunks
    }
}