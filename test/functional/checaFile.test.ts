import supertest from "supertest";


describe("teste funcional checaFile", () => {
    it("deve retornar um arquivo já editado", async() => {
        const {body} = await global.testRequest.get('/forecast');
        expect(body).toEqual(['a'])
    })
})