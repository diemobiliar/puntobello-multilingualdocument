"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguageDoc = exports.getIconNameByFileName = void 0;
var tslib_1 = require("tslib");
/**
 * Returns the corresponding Fluent UI icon name based on the file extension of a given file name.
 *
 * @param {string} fileName - The name of the file including its extension.
 * @returns {string} - The icon name corresponding to the file type, such as 'WordDocument' for Word files,
 *                     'ExcelDocument' for Excel files, or a generic icon for unknown file types.
 *
 * @example
 * getIconNameByFileName('document.pdf'); // Returns 'PDF'
 * getIconNameByFileName('spreadsheet.xlsx'); // Returns 'ExcelDocument'
 * getIconNameByFileName('presentation.pptx'); // Returns 'PowerPointDocument'
 */
var getIconNameByFileName = function (fileName) {
    var fileExtensionPattern = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gmi;
    var matches = fileName.match(fileExtensionPattern);
    var matchExt = matches ? matches[0] : '';
    switch (matchExt.toLowerCase()) {
        case '.doc':
        case '.docx':
            return 'WordDocument';
        case '.xls':
        case '.xlsx':
            return 'ExcelDocument';
        case '.ppt':
        case '.pptx':
            return 'PowerPointDocument';
        case '.one':
            return 'OneNoteLogoInverse';
        case '.pdf':
            return 'PDF';
        default:
            return 'StatusCircleQuestionMark'; // Returns a generic icon for unknown file types
    }
};
exports.getIconNameByFileName = getIconNameByFileName;
/**
 * Retrieves language-specific documents related to a given list item and updates the state with the results.
 * This function is used to fetch documents that are connected by a language connection (pb_LangConn).
 *
 * @param {SPFI} sp - The SPFI instance for interacting with SharePoint.
 * @param {string} listid - The ID of the SharePoint list from which to retrieve the documents.
 * @param {number} itemid - The ID of the list item to which the documents are related.
 * @param {(items: any[]) => void} setDocItems - A callback function to update the state with the retrieved documents.
 * @param {(show: boolean) => void} setShowProgress - A callback function to control the loading state.
 *
 * @returns {Promise<void>} - A promise that resolves when the documents have been successfully retrieved and the state has been updated.
 *
 * @example
 * getLanguageDoc(sp, 'list-id', 1, setDocItems, setShowProgress);
 */
var getLanguageDoc = function (sp, listid, itemid, setDocItems, setShowProgress) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var docItem, langConn, filterQuery, docItems;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sp.web.lists.getById(listid).items.getById(itemid)()];
            case 1:
                docItem = _a.sent();
                if (!docItem) return [3 /*break*/, 3];
                langConn = docItem["pb_LangConn"];
                if (!(langConn != null && langConn.length > 0)) return [3 /*break*/, 3];
                filterQuery = "(ID ne ".concat(itemid, ") and (pb_LangConn eq '").concat(langConn, "')");
                return [4 /*yield*/, sp.web.lists.getById(listid).items.select('File', 'Title', 'pb_LangCd', 'pb_LangConn').expand('File').filter(filterQuery)()];
            case 2:
                docItems = _a.sent();
                setDocItems(docItems); // Updates the state with the retrieved documents
                setShowProgress(false); // Hides the loading indicator
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getLanguageDoc = getLanguageDoc;
//# sourceMappingURL=languagedoc.js.map