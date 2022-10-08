import * as fs from "fs";
import path from "path";

describe("Testes download", () => {
  const arquivos = ["test-download-correto"];

  afterAll(async () => {
    const resolvePath = path.resolve("src");
    const dirTemp = path.join(resolvePath, "temp");
    for (let prop in arquivos) {
      fs.promises.unlink(`${dirTemp}/${arquivos[prop]}`);
    }
  });

  it("Deve retornar o download correto", async () => {
    const resolvePath = path.resolve("src");
    const dirTemp = path.join(resolvePath, "temp");
    const fileName = arquivos[0];
    await fs.promises.writeFile(
      `${dirTemp}/${fileName}`,
      "TESTE-deve retornar o download"
    );

    const response = await global.testRequest.get(`/download/${fileName}`);

    expect(response.headers["content-disposition"]).toEqual(
      'attachment; filename="test-download-correto"'
    );
  });

  it("Deve retornar error um erro caso Download expirado", async () => {
    const response = await global.testRequest.get(
      "/download/test-download-expikrado"
    );

    expect(response.text).toEqual(expect.stringContaining("Download expirado"));
  });
});
