import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import configuration from "@/config";
import { AppModule } from "@/main.module";
(async () => {
  const {
    app: { node_env, port },
  } = configuration();
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);
  if (node_env === "development") {
    SwaggerModule.setup("api", app, document);
  }

  await app.listen(port, () => {
    console.log(`Listen: [${node_env}] http://0.0.0.0:${port}`);
  });
})();
