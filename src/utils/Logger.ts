class Logger {
  shouldShowLog: boolean = process.env.NODE_ENV === "development"
  log(message?: any, ...optionalParams: any[]) {
    this.shouldShowLog && console.log(message, ...optionalParams)
  }
}

export const appLogger = new Logger()
