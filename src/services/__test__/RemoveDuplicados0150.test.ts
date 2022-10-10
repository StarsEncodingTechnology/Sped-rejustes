import path from "path";
import { RemoveDuplicados0150 } from "../RemoveDuplicados0150";
import dadosSemduplicados from "@test/fixtures/dadosSemDuplicados.json";

describe("RemoveDuplicados0150", () => {
  const resolvePath = path.resolve("test");
  it("deve retornar o txt normalizado CORRETO", async () => {
    console.log(resolvePath);
    const nameFile = "post_spedComDuplicados.txt";
    const removeDuplicados0150 = new RemoveDuplicados0150();

    const response = await removeDuplicados0150.normalizaTxt(
      resolvePath + "/fixtures/",
      nameFile
    );

    const respostaCorreta = Array.from(dadosSemduplicados);
    expect(response).toEqual(respostaCorreta);
  });

  it("deve retornar um erro caso arquivo incompleto", async () => {
    const nameFile = "spedFaltandoPedaco.txt";
    const removeDuplicados0150 = new RemoveDuplicados0150();

    await expect(
      removeDuplicados0150.normalizaTxt((resolvePath + "/fixtures/"), nameFile)
    ).rejects.toThrow(
      "Erro quando o arquivo não é valido: Linhas faltantes - 9999,D990,E990,G990,H990,K990,1990,9990"
    );
  });

  it("deve retornar um erro caso arquivo não seja da extensão correta", async () => {
    const nameFile = "ArquivoInvalido.json";
    const removeDuplicados0150 = new RemoveDuplicados0150();

    await expect(
      removeDuplicados0150.normalizaTxt((resolvePath + "/fixtures/"), nameFile)
    ).rejects.toThrow(
      "Erro quando o arquivo não é valido: Arquivo de formato invalido"
    );
  });
});
