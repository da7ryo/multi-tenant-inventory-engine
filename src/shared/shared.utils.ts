export class AppLogger {
  constructor() {}

  logInfo(info: any) {
    console.log("********************* INFO 📝 *********************");
    console.log(info);
  }

  logError(error: any) {
    console.error("********************* ERROR 💥 *********************");
    console.error(error);
  }

  logWarning(warning: any) {
    console.warn("********************* WARNING ⚠️ *********************");
    console.warn(warning);
  }
}
