import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';
import { ConsoleTransportInstance } from 'winston/lib/winston/transports';
import { FileTransportInstance } from 'winston/lib/winston/transports';
import path from 'path';

/**
 * Custom logging class to provide robust logging for different environments and scenarios.
 * Supports console and file logging with different formats and log levels.
 */
class Logger {
  private logger: WinstonLogger;

  constructor() {
    const logFormat = format.printf(({ level, message, timestamp, stack, ...meta }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${stack || message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
    });

    // File log format for JSON structured logs
    const jsonFormat = format.combine(format.timestamp(), format.json());

    // Console transport for development
    const consoleTransport: ConsoleTransportInstance = new transports.Console({
      format: format.combine(
        format.colorize(), // Colorize console output
        format.timestamp(),
        logFormat
      ),
    });

    // File transports
    const errorFileTransport: FileTransportInstance = new transports.File({
      filename: path.join('logs', 'error.log'),
      level: 'error',
    });

    const combinedFileTransport: FileTransportInstance = new transports.File({
      filename: path.join('logs', 'combined.log'),
    });

    // Create logger instance
    this.logger = createLogger({
      level: process.env.LOG_LEVEL || 'info', // Default log level
      format: jsonFormat, // Default format for file logs
      transports: [
        errorFileTransport,
        combinedFileTransport,
        ...(process.env.NODE_ENV !== 'production' ? [consoleTransport] : []), // Add console transport for non-production environments
      ],
    });
  }

  /**
   * Log informational messages.
   *
   * @param message - The log message
   * @param meta - Optional metadata
   */
  info(message: string, meta?: any): void {
    this.logger.info(message, meta);
  }

  /**
   * Log warning messages.
   *
   * @param message - The log message
   * @param meta - Optional metadata
   */
  warn(message: string, meta?: any): void {
    this.logger.warn(message, meta);
  }

  /**
   * Log error messages with stack trace.
   *
   * @param message - The log message
   * @param meta - Optional metadata
   */
  error(message: string, meta?: any): void {
    this.logger.error(message, { ...meta, stack: meta?.stack || new Error(message).stack });
  }

  /**
   * Log debugging messages, typically used during development.
   *
   * @param message - The log message
   * @param meta - Optional metadata
   */
  debug(message: string, meta?: any): void {
    if (process.env.NODE_ENV === 'development') {
      this.logger.debug(message, meta);
    }
  }
}

export default new Logger();
