import { Logger } from "./logger";

export class Utility {

  /**
   * Retrieves a translated string for the specified locale.
   * 
   * @param {string} stringName - The name of the string to be translated.
   * @param {string} locale - The locale to use for the translation (e.g., 'en-US', 'de-DE').
   * @returns {string} The translated string, or an error message if the translation file is missing.
   * 
   * @remarks
   * This method first attempts to load the translation file corresponding to the provided locale.
   * If the file is not found, it attempts to load a default language file.
   * If both files are missing, an error is logged, and a fallback error message is returned.
   */
  static getStringTranslation4Locale(stringName: string, locale: string): string {
    try {
      const translatedString = require(`../loc/${locale}.js`);
      return translatedString[stringName];
    } catch {
      try {
        const defaultString = require(`../loc/default.js`);
        return defaultString[stringName];
      } catch (defaultError) {
        Logger.getInstance().error('Failed to load default language file', defaultError);
        return `Error: Missing translation file for ${locale} and default locale`;
      }
    }
  }
}