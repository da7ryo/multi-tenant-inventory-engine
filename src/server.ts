import "dotenv/config";
import { createApp } from "./app";
import { CONFIG } from "./core/config";
import { appLogger } from "./singletons";

const { app } = createApp();

app.listen(CONFIG.PORT, () => {
  appLogger.logInfo(
    `Server is running on ${CONFIG.HOST_URL} on port ${CONFIG.PORT}`,
  );
});
