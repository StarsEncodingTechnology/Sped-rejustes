import { join } from "path";
import { RemoveDuplicados0150 } from "../RemoveDuplicados0150";
import dadosSemduplicados from "@test/fixtures/dadosSemDuplicados.json";

describe("RemoveDuplicados0150", () => {
  const dirTxt = join(__dirname, "../../../test/fixtures");
  it("deve retornar o txt normalizado CORRETO", async () => {
    const nameFile = "post_spedComDuplicados.txt";
    const removeDuplicados0150 = new RemoveDuplicados0150();

    const response = await removeDuplicados0150.normalizaTxt(dirTxt, nameFile);

    const respostaCorreta = Array.from(dadosSemduplicados);
    expect(response).toEqual(respostaCorreta);
  });

  it("deve retornar um erro", async () => {
    const nameFile = "spedFaltandoPedaco.txt"
    const removeDuplicados0150 = new RemoveDuplicados0150()

    const response = await removeDuplicados0150.normalizaTxt(dirTxt, nameFile);

    

  })
});
