import path from "path";

describe("teste funcional duplicado", () => {
  it("deve retornar a pagina de sucesso", async () => {
    const txt = path.resolve(
      __dirname,
      "../fixtures/post_spedComDuplicados.txt"
    );

    const response = await global.testRequest
      .post("/duplicado")
      .attach("imputTxt", txt);

    expect(response.text).toEqual(
      expect.stringContaining(
        "Faça download do resultado clicando no botão a seguir"
      )
    );
  });

  it("deve retornar um erro de falta de linhas", async () => {
    const txt = path.resolve(__dirname, "../fixtures/spedFaltandoPedaco.txt");

    const response = await global.testRequest
      .post("/duplicado")
      .attach("imputTxt", txt);

    expect(response.text).toEqual(
      expect.stringContaining(
        "ArquivoNaoValidoError: Erro quando o arquivo não é valido: Linhas faltantes"
      )
    );
  });

  it("deve retornar um erro de arquivo invalido", async () => {
    const txt = path.resolve(__dirname, "../fixtures/ArquivoInvalido.json");

    const response = await global.testRequest
      .post("/duplicado")
      .attach("imputTxt", txt);

    expect(response.text).toEqual(
      expect.stringContaining("Possivelmente arquivo invalido")
    );
  });


});
