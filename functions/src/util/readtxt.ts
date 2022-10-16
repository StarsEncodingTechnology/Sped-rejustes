export default class ReadTxt {
  private static convertFileEmArray(file: string): string[][] {
    // faz conversão do string em array
    const arrayLinha = file.split(/\r\n|\n|\r/gm);

    const arrayFinal = arrayLinha.map((element) => {
      return element.split("|");
    });

    return arrayFinal;
  }

  public static async readFile(fileBuffer: Buffer): Promise<string[][]> {
      const file = fileBuffer.toString("utf-8");
      return this.convertFileEmArray(file);
  }
}
