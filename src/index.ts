import logger from "./logger";
import { SetupServer } from "./server";

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

process.on("unhandledRejection", (reason, promise) => {
  logger.error(
    `app saida executando a promise: ${promise} por razão de: ${reason}`
  );

  throw reason;
});

process.on("uncaughtException", (error) => {
  logger.error(`App saida, foi capturado um erro fora do padrão: ${error}`);

  process.exit(ExitStatus.Failure);
});

(async () => {
  // iniciando
  logger.info("Iniciando APP");
  try {
    const port: string = process.env.PORT || "3000";
    const server = new SetupServer(port);
    server.init();
    server.start();

    const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGURG"];

    exitSignals.map((sig) =>
      process.on(sig, async () => {
        try {
          await server.close();
          process.exit(ExitStatus.Success);
        } catch (e) {
          logger.error(`App exited with error: ${e}`);
          process.exit(ExitStatus.Failure);
        }
      })
    );
  } catch (e) {
    logger.error(`App exited with error: ${e}`);
    process.exit(ExitStatus.Failure);
  }
})();
