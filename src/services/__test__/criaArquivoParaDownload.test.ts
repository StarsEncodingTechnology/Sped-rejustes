import arquivoCorreto from "@test/fixtures/dadosSemDuplicados.json";
import { CriaArquivoParaDownlaod } from "../criaArquivoParaDownload";

describe("Teste para cria arquivo para download", () => {
  it("deve retornar o valor correto", async () => {
    const arrayString: string[][] = Array.from(arquivoCorreto);
    const criaArquivoParaDownload = new CriaArquivoParaDownlaod(arrayString);

    expect(await criaArquivoParaDownload.retornaDirArquivo()).toEqual(
      expect.stringContaining((arrayString[0][7]).replace(/[^0-9]/g, ''))
    );
  });
});
