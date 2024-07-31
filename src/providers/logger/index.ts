export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export enum LogColors {
  INFO = "#4caf50",
  WARN = "#ff9800",
  ERROR = "#f44336",
  DEBUG = "#2196f3",
}

export class Logger {
  private logLevel: LogLevel;

  private isDevelopment: boolean;

  private logs: string[];

  constructor(logLevel: LogLevel = LogLevel.INFO, isDevelopment = false) {
    this.logLevel = logLevel;

    this.isDevelopment = isDevelopment;
    
    this.logs = [];
  }

  public debug<T>(message: string, ...args: T[]): void {
    if (this.logLevel <= LogLevel.DEBUG) {
      this.log("🐛", message, LogColors.DEBUG, ...args);
    }
  }

  public info<T>(message: string, ...args: T []): void {
    if (this.logLevel <= LogLevel.INFO) {
      this.log("ℹ️", message, LogColors.INFO, ...args);
    }
  }

  public warn<T>(message: string, ...args: T[]): void {
    if (this.logLevel <= LogLevel.WARN) {
      this.log("⚠️", message, LogColors.WARN, ...args);
    }
  }

  public error<T>(message: string, ...args: T []): void {
    if (this.logLevel <= LogLevel.ERROR) {
      this.log("🚨", message, LogColors.ERROR, ...args);
    }
  }

  private log<T>(
    emoji: string,
    message: string,
    color: string,
    ...args: T[]
  ): void {
    const formattedMessage = `${emoji}  ${message}`;

    const logMessage = `%c ${formattedMessage}`;

    const logArgs = [`color: ${color}`, ...args];

    if (this.isDevelopment) {
      console.log(logMessage, ...logArgs);
    }

    this.logs.push(formattedMessage);
  }

  public getLogs(): string[] {
    return this.logs;
  }
}
