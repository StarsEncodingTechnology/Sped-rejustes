import ReadTxt from "@src/util/readtxt";




export class RemoveDuplicados0150 {
    constructor(){};

    public async normalizaTxt(
        dir: string,
        file: string
    ): Promise<string[][]> {
        const linhasTxt = await ReadTxt.readFile(`${dir}/${file}`);
        

        return linhasTxt
    }


}

