import fs from "fs";

export default function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;

  try {
    fs.promises.appendFile("app.log", logMessage);
  } catch (error) {
    console.error("Error writing to log file:", error);
  }
}
