"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utility = void 0;
var logger_1 = require("./logger");
var Utility = /** @class */ (function () {
    function Utility() {
    }
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
    Utility.getStringTranslation4Locale = function (stringName, locale) {
        try {
            var translatedString = require("../loc/".concat(locale, ".js"));
            return translatedString[stringName];
        }
        catch (_a) {
            try {
                var defaultString = require("../loc/default.js");
                return defaultString[stringName];
            }
            catch (defaultError) {
                logger_1.Logger.getInstance().error('Failed to load default language file', defaultError);
                return "Error: Missing translation file for ".concat(locale, " and default locale");
            }
        }
    };
    return Utility;
}());
exports.Utility = Utility;
//# sourceMappingURL=utils.js.map