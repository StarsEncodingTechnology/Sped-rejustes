import * as fs from "fs";
import path from "path";

describe("Testes download", () => {
    afterAll(() => {
        fs.unlink
    })
  it.only("Deve retornar o download correto", async () => {
    const resolvePath = path.resolve("src");
    const dirTemp = path.join(resolvePath, "temp");

    

  });

  it("Deve retornar error um erro caso Download expirado", async () => {
    const response = await global.testRequest.get(
      "/download/test-download-expirado"
    );

    expect(response.text).toEqual(expect.stringContaining("Download expirado"));
  });
});
