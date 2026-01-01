"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceActionInUri = exports.ensureParameters = exports.getIconNameByFileType = exports.getFormattedLocale = exports.getFileExtension = void 0;
var envconfig_1 = require("./envconfig");
// Retrieve the environment configuration settings
var rootEnv = (0, envconfig_1.getRootEnv)();
/**
 * Extracts the file extension from a given file URL.
 *
 * @param {string} fileUrl - The URL of the file.
 * @returns {string} The file extension if found; otherwise, returns 'ENF' (Extension Not Found).
 */
var getFileExtension = function (fileUrl) {
    var lastPoint = fileUrl.lastIndexOf('.');
    if (lastPoint > 0) {
        return fileUrl.substring(lastPoint + 1, fileUrl.length);
    }
    else {
        return 'ENF';
    }
};
exports.getFileExtension = getFileExtension;
/**
 * Formats a language code based on truncation and case options.
 *
 * @param {boolean} truncateLocale - Whether to truncate the locale code to two characters.
 * @param {boolean} upperCaseLocale - Whether to convert the locale code to uppercase.
 * @param {string} langCd - The original language code.
 * @returns {string} The formatted language code.
 */
var getFormattedLocale = function (truncateLocale, upperCaseLocale, langCd) {
    if (!truncateLocale)
        return langCd;
    return upperCaseLocale ? langCd.substring(0, 2).toUpperCase() : langCd.substring(0, 2);
};
exports.getFormattedLocale = getFormattedLocale;
/**
 * Retrieves the appropriate icon name and color based on the file type.
 *
 * @param {string} fileType - The file extension/type.
 * @returns {IIconData} An object containing the icon name and icon color associated with the file type.
 */
var getIconNameByFileType = function (fileType) {
    var _a, _b, _c, _d, _e, _f;
    switch (fileType.toLowerCase()) {
        case 'doc':
        case 'docx':
            return { iconName: 'WordDocument', iconColor: (_a = rootEnv.css['--spfx_color_doc_icon']) !== null && _a !== void 0 ? _a : '' };
        case 'xls':
        case 'xlsx':
        case 'xlsm':
            return { iconName: 'ExcelDocument', iconColor: (_b = rootEnv.css['--spfx_color_xls_icon']) !== null && _b !== void 0 ? _b : '' };
        case 'ppt':
        case 'pptx':
            return { iconName: 'PowerPointDocument', iconColor: (_c = rootEnv.css['--spfx_color_ppt_icon']) !== null && _c !== void 0 ? _c : '' };
        case 'one':
            return { iconName: 'OneNoteLogoInverse', iconColor: (_d = rootEnv.css['--spfx_color_one_icon']) !== null && _d !== void 0 ? _d : '' };
        case 'pdf':
            return { iconName: 'PDF', iconColor: (_e = rootEnv.css['--spfx_color_pdf_icon']) !== null && _e !== void 0 ? _e : '' };
        default:
            return { iconName: 'StatusCircleQuestionMark', iconColor: (_f = rootEnv.css['--spfx_color_primary']) !== null && _f !== void 0 ? _f : '' };
    }
};
exports.getIconNameByFileType = getIconNameByFileType;
/**
 * Ensures that specific parameters are present in the URL's query string.
 * If a parameter is missing, it is added with the provided value.
 *
 * @param {string | URL} url - The original URL or a URL object.
 * @param {Array<[string, string]>} params - An array of key-value pairs representing the parameters to be added.
 * @returns {string} The updated URL with the ensured parameters.
 */
var ensureParameters = function (url, params) {
    var urlObject = new URL(url);
    var searchParams = new URLSearchParams(urlObject.search);
    params.forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (!searchParams.has(key)) {
            searchParams.append(key, value);
        }
    });
    urlObject.search = searchParams.toString();
    return urlObject.toString();
};
exports.ensureParameters = ensureParameters;
/**
 * Modifies the action parameter in a URI and ensures that certain parameters are included.
 * Primarily used to adjust document viewing behavior and ensure correct URL parameters.
 *
 * @param {string} uri - The original URI.
 * @returns {string} The modified URI with updated actions and ensured parameters.
 */
var replaceActionInUri = function (uri) {
    var retVal = uri;
    if (uri.indexOf('&action=interactivepreview') > 0) {
        retVal = uri.replace('&action=interactivepreview', '&action=view');
    }
    var parametersToAdd = [
        ['csf', '1'],
        ['web', '1']
    ];
    retVal = (0, exports.ensureParameters)(retVal, parametersToAdd);
    return retVal;
};
exports.replaceActionInUri = replaceActionInUri;
//# sourceMappingURL=multilingdocs.js.map