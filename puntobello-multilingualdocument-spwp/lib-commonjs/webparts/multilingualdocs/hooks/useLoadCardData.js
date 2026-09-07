"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLoadCardData = void 0;
var tslib_1 = require("tslib");
// React and React-related imports
var react_1 = require("react");
// Utility Libraries
var moment_1 = tslib_1.__importDefault(require("moment"));
// Fluent UI and Styling
var Styling_1 = require("@fluentui/react/lib/Styling");
// Utility Functions
var utils_1 = require("../utils");
var useLoadCardData = function (collectionData, spo, truncateLocale, upperCaseLocale) {
    var _a = (0, react_1.useState)([]), docData = _a[0], setDocData = _a[1]; // State to hold document data
    var currDocData = []; // Temporary array to accumulate document data
    // useEffect to load card data whenever the collectionData changes
    (0, react_1.useEffect)(function () {
        if (collectionData) {
            loadCardData();
        }
    }, [collectionData]);
    /**
     * Loads and processes document data for the collectionData provided.
     *
     * This function:
     * - Fetches the main document item from SharePoint.
     * - Determines the file type and retrieves the corresponding icon.
     * - Creates a preview card for the document.
     * - Fetches related documents and prepares them for display.
     * - Sorts the related documents and updates the state with processed data.
     */
    var loadCardData = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currDocData.length = 0; // Reset the temporary array
                    return [4 /*yield*/, Promise.all(collectionData.map(function (doccard, idx) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                            var theme, palette, fonts, previewCard, relatedDocuments, currLinkingUri, currFileType, tenantFileUrl, mainItem, iconData, currMobiConn, filterQuery, guidRegex, editLink, guidFound, otherItems, tempDocData;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        theme = (0, Styling_1.getTheme)();
                                        palette = theme.palette, fonts = theme.fonts;
                                        previewCard = { previewImages: [], styles: { previewIcon: { backgroundColor: (0, utils_1.getRootEnv)().css['--spfx_color_grey_brightness_bright'] } } };
                                        relatedDocuments = [];
                                        currFileType = '';
                                        // Determine the tenant file URL
                                        if (doccard.docweburl.indexOf('/sites/') > 0) {
                                            tenantFileUrl = doccard.docweburl.substring(0, doccard.docweburl.indexOf('/sites/'));
                                        }
                                        else {
                                            tenantFileUrl = doccard.docweburl;
                                        }
                                        return [4 /*yield*/, spo.getItemFromWebFromFileUrl(doccard.docweburl, doccard.docurl)];
                                    case 1:
                                        mainItem = _a.sent();
                                        // Determine the file type and retrieve the corresponding icon
                                        currFileType = (0, utils_1.getFileExtension)(doccard.docurlhidden);
                                        iconData = (0, utils_1.getIconNameByFileType)(currFileType);
                                        // Prepare the preview card with the retrieved icon
                                        previewCard.previewImages.push({
                                            previewIconProps: {
                                                iconName: iconData.iconName,
                                                styles: {
                                                    root: {
                                                        fontSize: fonts.superLarge.fontSize,
                                                        color: iconData.iconColor,
                                                        backgroundColor: (0, utils_1.getRootEnv)().css['--spfx_color_grey_brightness_bright'],
                                                    },
                                                },
                                            },
                                        });
                                        // Generate the linking URI based on the file type
                                        if (currFileType === 'pdf') {
                                            currLinkingUri = (0, utils_1.replaceActionInUri)(decodeURI(doccard.docurl));
                                        }
                                        else {
                                            currLinkingUri = (0, utils_1.replaceActionInUri)(mainItem['ServerRedirectedEmbedUri']);
                                        }
                                        // Add the main document as a related document
                                        relatedDocuments.push({
                                            key: mainItem['Id'],
                                            langCd: (0, utils_1.getFormattedLocale)(truncateLocale, upperCaseLocale, mainItem['pb_LangCd']),
                                            name: mainItem['Title'],
                                            Url: currLinkingUri,
                                            target: '_blank',
                                            tooltip: mainItem['Title']
                                        });
                                        if (mainItem['pb_LangConn'] != null && mainItem['pb_LangConn'].length > 0) {
                                            currMobiConn = mainItem['pb_LangConn'];
                                        }
                                        else {
                                            currMobiConn = '';
                                        }
                                        filterQuery = "(pb_LangConn eq '".concat(currMobiConn, "') and (pb_LangCd ne '").concat(mainItem['pb_LangCd'], "')");
                                        guidRegex = '(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}';
                                        editLink = mainItem['odata.editLink'];
                                        guidFound = editLink.match(guidRegex);
                                        return [4 /*yield*/, spo.getFilteredExpandedItems(doccard.docweburl, guidFound[0], filterQuery)];
                                    case 2:
                                        otherItems = _a.sent();
                                        // Process each related document and add to the relatedDocuments array
                                        otherItems.forEach(function (otherItem) {
                                            var currOtherItemUri = '';
                                            if (currFileType === 'pdf') {
                                                currOtherItemUri = (0, utils_1.replaceActionInUri)(tenantFileUrl + otherItem['File']['ServerRelativeUrl']);
                                            }
                                            else {
                                                currOtherItemUri = (0, utils_1.replaceActionInUri)(otherItem['ServerRedirectedEmbedUri']);
                                            }
                                            relatedDocuments.push({
                                                key: otherItem['Id'],
                                                langCd: (0, utils_1.getFormattedLocale)(truncateLocale, upperCaseLocale, otherItem['pb_LangCd']),
                                                name: otherItem['Title'],
                                                Url: currOtherItemUri,
                                                target: '_blank',
                                                tooltip: otherItem['Title']
                                            });
                                        });
                                        // Sort related documents by language code
                                        relatedDocuments.sort(function (a, b) { return (a.langCd > b.langCd) ? 1 : ((b.langCd > a.langCd) ? -1 : 0); });
                                        tempDocData = {
                                            preview: previewCard,
                                            targetUrl: currLinkingUri,
                                            relatedDocs: relatedDocuments,
                                            lastActivity: (0, moment_1.default)(mainItem['Modified']).format('DD.MM.YYYY'),
                                            docTitle: mainItem['Title'],
                                            docDesc: mainItem['_Extended_Description'],
                                            iconName: iconData.iconName,
                                            fileType: currFileType,
                                            sortOrder: idx,
                                        };
                                        // Add the document data object to the array
                                        currDocData.push(tempDocData);
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 1:
                    _a.sent();
                    // Sort the document data by sort order and update the state
                    currDocData.sort(function (a, b) { var _a, _b, _c, _d; return (((_a = a.sortOrder) !== null && _a !== void 0 ? _a : 0) > ((_b = b.sortOrder) !== null && _b !== void 0 ? _b : 0)) ? 1 : ((((_c = b.sortOrder) !== null && _c !== void 0 ? _c : 0) > ((_d = a.sortOrder) !== null && _d !== void 0 ? _d : 0)) ? -1 : 0); });
                    setDocData(tslib_1.__spreadArray([], currDocData, true)); // Update the state with the sorted data
                    return [2 /*return*/];
            }
        });
    }); };
    return docData; // Return the processed document data
};
exports.useLoadCardData = useLoadCardData;
//# sourceMappingURL=useLoadCardData.js.map