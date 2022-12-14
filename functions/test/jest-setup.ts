import { SetupServer } from "@src/server";
import supertest from "supertest";

let server: SetupServer;

beforeAll(async () => {
  // a chamada antes de tudo acontecer
  server = new SetupServer("3000", "../../public");
  // cria um novo OBJ setupServer
  // que é a configuração do servidor

  await server.init();
  // inicia o servidor
  global.testRequest = supertest(server.getApp());
  // coloca valor no testRequest
  // sendo ele o app() do servidor
});

afterAll(async () => await server.close());
