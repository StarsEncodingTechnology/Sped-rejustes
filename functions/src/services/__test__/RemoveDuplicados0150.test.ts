import path from "path";
import { RemoveDuplicados0150 } from "../RemoveDuplicados0150";
import dadosSemduplicados from "@test/fixtures/dadosSemDuplicados.json";
import * as fs from "fs";
import { InterfaceInfoFiles } from "@src/middleware/upload/spedtxt";

describe("RemoveDuplicados0150", () => {
  const resolvePath = path.resolve("test");
  it("deve retornar o txt normalizado CORRETO", async () => {
    console.log(resolvePath);
    const nameFile = "post_spedComDuplicados.txt";
    const removeDuplicados0150 = new RemoveDuplicados0150();

    const bufferFile = await fs.promises.readFile(
      path.join(resolvePath + "/fixtures/", nameFile)
    );

    const fileInfo: InterfaceInfoFiles = {
      fieldname: "teste",
      originalName: "teste",
      encoding: "teste",
      mimeType: "teste",
      buffer: bufferFile,
      size: 10,
    };

    const response = await removeDuplicados0150.normalizaTxt(fileInfo);

    const respostaCorreta = Array.from(dadosSemduplicados);
    expect(response).toEqual(respostaCorreta);
  });

  it("deve retornar um erro caso arquivo incompleto", async () => {
    const nameFile = "spedFaltandoPedaco.txt";
    const removeDuplicados0150 = new RemoveDuplicados0150();

    const bufferFile = await fs.promises.readFile(
      path.join(resolvePath + "/fixtures/", nameFile)
    );

    const fileInfo: InterfaceInfoFiles = {
      fieldname: "teste",
      originalName: "teste",
      encoding: "teste",
      mimeType: "teste",
      buffer: bufferFile,
      size: 10,
    };

    await expect(
      removeDuplicados0150.normalizaTxt(fileInfo)
    ).rejects.toThrow(
      "Erro quando o arquivo não é valido: Linhas faltantes - 9999,D990,E990,G990,H990,K990,1990,9990"
    );
  });

  // it.skip("deve retornar um erro caso arquivo não seja da extensão correta", async () => {
  //   // esse teste não acontece mais pq é testado anteriormente
  //   const nameFile = "ArquivoInvalido.json";
  //   const removeDuplicados0150 = new RemoveDuplicados0150();

  //   const bufferFile = await fs.promises.readFile(
  //     path.join(resolvePath + "/fixtures/", nameFile)
  //   );

  //   const fileInfo: InterfaceInfoFiles = {
  //     fieldname: "teste",
  //     originalName: "teste",
  //     encoding: "teste",
  //     mimeType: "teste",
  //     buffer: bufferFile,
  //     size: 10,
  //   };


  //   await expect(
  //     removeDuplicados0150.normalizaTxt(fileInfo)
  //   ).rejects.toThrow(
  //     "Erro quando o arquivo não é valido: Arquivo de formato invalido"
  //   );
  // });
});
