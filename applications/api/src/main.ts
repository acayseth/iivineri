import { NestFactory } from "@nestjs/core";
import * as compression from "compression";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import configuration from "@/config";
import { AppModule } from "@/main.module";
(async () => {
  const {
    app: { node_env },
  } = configuration();
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use(compression());

  const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);
  if (node_env === "development") {
    SwaggerModule.setup("api", app, document);
  }

  await app.listen(4000, () => {
    console.log(`Listen: [${node_env}] http://0.0.0.0:4000`);
  });
})();
