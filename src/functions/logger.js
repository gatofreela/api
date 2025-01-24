import colors from "colors";
import {
  Logger as WinstonLogger,
  createLogger as createWinstonLogger,
  format,
  transports,
} from "winston";

/**
 * Creates a customized logger instance for console and file logging.
 *
 * @function
 * @returns {WinstonLogger} The configured Winston logger instance.
 *
 * @property {string} level - The default logging level ("info").
 * @property {string} dirname - The directory where log files are stored.
 * @property {transports.Console} transports.Console - Handles console logging with colors.
 * @property {transports.File} transports.File - Handles file logging in plain text format.
 * @property {Object} format - Configures log format with timestamp, prefix, and color-coded levels.
 *
 * @example
 * // Example usage
 * import { logger } from './logger';
 * logger.info('This is an info log');
 * logger.error(new Error('This is an error log'));
 *
 * @description
 * - Logs messages with levels: "info", "warn", and "error".
 * - Colors levels for the console: "info" (blue), "warn" (yellow), "error" (red).
 * - Formats log entries with a timestamp, prefix `[server]`, and message.
 * - Saves logs to a file named `latest.log` in the `./logs` directory.
 * - Removes colorization for file logs.
 */
const logger = createWinstonLogger({
  level: "info",
  dirname: "./logs",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf((info) => {
      const timestamp = colors.green(info.timestamp);
      const prefix = `[${colors.cyan("server")}]`;
      const level =
        {
          error: colors.red(info.level.toUpperCase()),
          warn: colors.yellow(info.level.toUpperCase()),
          info: colors.blue(info.level.toUpperCase()),
        }[info.level] || colors.white(info.level.toUpperCase());
      const message =
        info.message instanceof Error
          ? colors.red(
              `Error: ${info.message.message}\nStack: ${info.message.stack}`,
            )
          : info.message;
      return `${timestamp} ${prefix} ${level}: ${message}`;
    }),
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      dirname: "./logs",
      filename: "latest.log",
      format: format.combine(format.uncolorize()),
    }),
  ],
});

export { logger };
