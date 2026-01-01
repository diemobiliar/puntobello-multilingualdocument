"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// React and ReactDOM imports
var React = tslib_1.__importStar(require("react"));
var ReactDom = tslib_1.__importStar(require("react-dom"));
// SPFx specific imports
var decorators_1 = require("@microsoft/decorators");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_listview_extensibility_1 = require("@microsoft/sp-listview-extensibility");
// Fluent UI imports for UI-related utilities
var react_1 = require("@fluentui/react");
// PnPJS imports for SharePoint operations
var pnpjs_config_1 = require("../../pnpjs-config");
require("@pnp/sp/webs");
require("@pnp/sp/lists");
require("@pnp/sp/items");
// Custom component imports
var ConfirmationDialog_1 = tslib_1.__importDefault(require("./components/ConfirmationDialog"));
// Utility imports
var utils_1 = require("./utils");
/**
 * LanguageConnectionCommandSet class extends BaseListViewCommandSet.
 * It handles the logic for creating and deleting language connections for documents in a SharePoint library.
 */
var LanguageConnectionCommandSet = /** @class */ (function (_super) {
    tslib_1.__extends(LanguageConnectionCommandSet, _super);
    function LanguageConnectionCommandSet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dialogPlaceHolder = null; // Placeholder for the React dialog component
        _this._sp = null; // SharePoint Framework interface instance
        /**
         * Dismisses the currently open dialog and refreshes the page.
         */
        _this.dismissDialog = function () {
            _this.renderDialogComponent({ isOpen: false });
            location.reload();
        };
        return _this;
    }
    /**
     * Initializes the command set, setting up the logger, PnPJS instance,
     * and creating the dialog placeholder element.
     */
    LanguageConnectionCommandSet.prototype.onInit = function () {
        this.logger = utils_1.Logger.getInstance();
        this.logger.setContextInfo(this.context.manifest.alias + " with id " + this.context.manifest.id);
        this.logger.info('Logger initialized');
        // PnP initialization
        this._sp = (0, pnpjs_config_1.getSP)(this.context);
        // Initialize commands with localized titles
        var createCommand = this.tryGetCommand('COMMAND_CONN_DELETE');
        if (createCommand) {
            createCommand.title = utils_1.Utility.getStringTranslation4Locale('CommandDelName', this.context.pageContext.cultureInfo.currentUICultureName);
        }
        var deleteCommand = this.tryGetCommand('COMMAND_CONN_CREATE');
        if (deleteCommand) {
            deleteCommand.title = utils_1.Utility.getStringTranslation4Locale('CommandCreateName', this.context.pageContext.cultureInfo.currentUICultureName);
        }
        // Create the container for our React component
        this.dialogPlaceHolder = document.body.appendChild(document.createElement("div"));
        return Promise.resolve();
    };
    /**
     * Handles the logic for updating the visibility of commands
     * based on the current selection in the list view.
     */
    LanguageConnectionCommandSet.prototype.onListViewUpdated = function (event) {
        var compareConnDeleteCommand = this.tryGetCommand('COMMAND_CONN_DELETE');
        var compareConnCreateCommand = this.tryGetCommand('COMMAND_CONN_CREATE');
        // If no rows are selected, hide the commands
        if (event.selectedRows.length === 0) {
            compareConnCreateCommand.visible = false;
            compareConnDeleteCommand.visible = false;
            return;
        }
        try {
            var checkField1 = event.selectedRows[0].getValueByName('pb_LangConn');
            var checkField2 = event.selectedRows[0].getValueByName('pb_LangCd');
            if (checkField1.length > 0 && checkField2.length > 0) {
                var fakeTest = 1;
            }
        }
        catch (err) {
            this.logger.error('Commands not activated because pb_LangConn and/or pb_LangCd do not exist in this document library', err);
            compareConnCreateCommand.visible = false;
            compareConnDeleteCommand.visible = false;
            return;
        }
        // Show delete command when one row is selected and we have a language connection set for this row
        if (compareConnDeleteCommand) {
            compareConnDeleteCommand.visible = event.selectedRows.length === 1 && event.selectedRows[0].getValueByName('pb_LangConn').length > 0;
        }
        // Show create command when:
        // - We have a mix between one document with language connection and some documents without language connection
        // - But never more than one document in a specific language
        var condition = true;
        if (compareConnCreateCommand && event.selectedRows.length > 1) {
            var groupedConn_1 = {};
            var groupedLang_1 = {};
            event.selectedRows.forEach(function (arrayItem) {
                var currLangConn = arrayItem.getValueByName('pb_LangConn');
                var currLang = arrayItem.getValueByName('pb_LangCd');
                var keyFoundConn = false;
                var keyFoundLang = false;
                // Group all the language connection entries
                for (var key1 in groupedConn_1) {
                    if (key1 === currLangConn) {
                        keyFoundConn = true;
                        groupedConn_1[key1] += 1;
                    }
                }
                // Group all the language entries
                for (var key2 in groupedLang_1) {
                    if (key2 === currLang) {
                        keyFoundLang = true;
                        groupedLang_1[key2] += 1;
                    }
                }
                // Create the keys if we have no match
                if (!keyFoundConn) {
                    groupedConn_1[currLangConn] = 1;
                }
                if (!keyFoundLang) {
                    groupedLang_1[currLang] = 1;
                }
            });
            // Condition checks for language connections and languages
            var numberOfGuids = 0;
            var emptyGuid = false;
            if (Object.keys(groupedConn_1).length > 2) {
                condition = false;
            }
            else {
                for (var key3 in groupedConn_1) {
                    if (key3.length > 0) {
                        numberOfGuids++;
                    }
                    else {
                        emptyGuid = true;
                    }
                }
                if (numberOfGuids > 1)
                    condition = false;
                if (!emptyGuid)
                    condition = false;
            }
            // Count the number of entries per language, which should never be more than one
            if (condition) {
                for (var key in groupedLang_1) {
                    if (parseInt(groupedLang_1[key]) > 1) {
                        condition = false;
                        break;
                    }
                }
            }
        }
        compareConnCreateCommand.visible = event.selectedRows.length > 1 && condition;
    };
    /**
     * Handles the execution of commands when they are triggered from the command set.
     */
    LanguageConnectionCommandSet.prototype.onExecute = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var updateRC, selectedItem, checkField1, checkField2, fakeTest, list, _a, guidKey_1, guidFound_1, fileTypes_1, multipleFileTypes_1, hasExistingConnection;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        updateRC = 0;
                        selectedItem = event.selectedRows[0];
                        try {
                            checkField1 = selectedItem.getValueByName('pb_LangConn');
                            checkField2 = selectedItem.getValueByName('pb_LangCd');
                            if (checkField1.length > 0 && checkField2.length > 0) {
                                fakeTest = 1;
                            }
                        }
                        catch (error) {
                            this.logger.error('Command not executed because pb_LangConn and/or pb_LangCd do not exist in this document library', error);
                            return [2 /*return*/];
                        }
                        list = this._sp.web.lists.getById(this.context.pageContext.list.id.toString());
                        _a = event.itemId;
                        switch (_a) {
                            case 'COMMAND_CONN_DELETE': return [3 /*break*/, 1];
                            case 'COMMAND_CONN_CREATE': return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 6];
                    case 1: 
                    // Remove the GUID on the field and show the dialog
                    return [4 /*yield*/, Promise.all(event.selectedRows.map(function (arrayItem) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(updateRC == 0)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.updateDocGuid('DELETE', list, arrayItem.getValueByName('ID'), '', arrayItem.getValueByName('pb_LangConn'))];
                                    case 1:
                                        updateRC = _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); }))];
                    case 2:
                        // Remove the GUID on the field and show the dialog
                        _b.sent();
                        this.displayDialog(updateRC === 423 ? 'lock' : 'delete');
                        return [3 /*break*/, 7];
                    case 3:
                        guidKey_1 = false;
                        guidFound_1 = null;
                        fileTypes_1 = new Set();
                        multipleFileTypes_1 = false;
                        event.selectedRows.forEach(function (arrayItem) {
                            // Search for a GUID key
                            if (arrayItem.getValueByName('pb_LangConn').length > 0) {
                                guidFound_1 = arrayItem.getValueByName('pb_LangConn');
                                guidKey_1 = true;
                            }
                            // Track file types
                            var fileType = arrayItem.getValueByName('File_x0020_Type');
                            fileTypes_1.add(fileType);
                            // Check if there is more than one file type
                            if (fileTypes_1.size > 1) {
                                multipleFileTypes_1 = true;
                            }
                        });
                        // If we have multiple file types, show an error message in the dialog and stop processing
                        if (multipleFileTypes_1) {
                            this.displayDialog('multipleFileTypes');
                            return [2 /*return*/];
                        }
                        // No GUID key found, we will create a new one
                        if (guidFound_1 === null) {
                            guidFound_1 = sp_core_library_1.Guid.newGuid().toString();
                        }
                        return [4 /*yield*/, this.checkExistingConnections(event.selectedRows, guidFound_1, list)];
                    case 4:
                        hasExistingConnection = _b.sent();
                        if (hasExistingConnection) {
                            this.displayDialog('existingConnection');
                            return [2 /*return*/];
                        }
                        // Update all the list items
                        return [4 /*yield*/, Promise.all(event.selectedRows.map(function (arrayItem) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(updateRC == 0)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.updateDocGuid('CREATE', list, arrayItem.getValueByName('ID'), guidFound_1, guidFound_1)];
                                        case 1:
                                            updateRC = _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 5:
                        // Update all the list items
                        _b.sent();
                        this.displayDialog(updateRC === 423 ? 'lock' : 'create');
                        return [3 /*break*/, 7];
                    case 6: throw new Error('Unknown command');
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Checks if any of the selected items already have a connection for the given language.
     * @param selectedRows - The rows selected in the list view.
     * @param langConn - The language connection GUID.
     * @param list - The SharePoint list instance.
     * @returns A boolean indicating whether an existing connection is found.
     */
    LanguageConnectionCommandSet.prototype.checkExistingConnections = function (selectedRows, langConn, list) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _i, selectedRows_1, arrayItem, languageCode, id, items;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, selectedRows_1 = selectedRows;
                        _a.label = 1;
                    case 1:
                        if (!(_i < selectedRows_1.length)) return [3 /*break*/, 4];
                        arrayItem = selectedRows_1[_i];
                        languageCode = arrayItem.getValueByName('pb_LangCd');
                        id = arrayItem.getValueByName('ID');
                        return [4 /*yield*/, list.items.filter("pb_LangCd eq '".concat(languageCode, "' and pb_LangConn eq '").concat(langConn, "' and ID ne '").concat(id, "'"))()];
                    case 2:
                        items = _a.sent();
                        // Check if any of the items have a connection for the selected language
                        if (items.some(function (item) { return item.pb_LangConn; })) {
                            return [2 /*return*/, true]; // Connection already exists for this language
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, false]; // No existing connection found
                }
            });
        });
    };
    /**
     * Displays a dialog based on the type of action performed (e.g., lock, delete, create).
     * @param type - The type of dialog to display.
     */
    LanguageConnectionCommandSet.prototype.displayDialog = function (type) {
        var titleKey;
        var messageKey;
        switch (type) {
            case 'lock':
                titleKey = 'CommandLockDialogTitle';
                messageKey = 'CommandLock';
                break;
            case 'delete':
                titleKey = 'CommandDelDialogTitle';
                messageKey = 'CommandDel';
                break;
            case 'create':
                titleKey = 'CommandCreateDialogTitle';
                messageKey = 'CommandCreate';
                break;
            case 'multipleFileTypes':
                titleKey = 'MultipleFileTypesDialogTitle';
                messageKey = 'MultipleFileTypes';
                break;
            case 'existingConnection':
                titleKey = 'ExistingConnectionDialogTitle';
                messageKey = 'ExistingConnection';
                break;
            default:
                throw new Error('Unknown dialog type');
        }
        this.showDialog(utils_1.Utility.getStringTranslation4Locale(titleKey, this.context.pageContext.cultureInfo.currentUICultureName), utils_1.Utility.getStringTranslation4Locale(messageKey, this.context.pageContext.cultureInfo.currentUICultureName), utils_1.Utility.getStringTranslation4Locale('OkBtnLabel', this.context.pageContext.cultureInfo.currentUICultureName));
    };
    /**
     * Helper function to show the dialog by rendering the ConfirmationDialog component.
     * @param Title - The title of the dialog.
     * @param Message - The message of the dialog.
     * @param OkBtnLabel - The label for the OK button.
     */
    LanguageConnectionCommandSet.prototype.showDialog = function (Title, Message, OkBtnLabel) {
        this.renderDialogComponent({
            isOpen: true,
            Title: Title,
            Message: Message,
            OkBtnLabel: OkBtnLabel,
            onClose: this.dismissDialog
        });
    };
    /**
     * Renders the dialog component into the placeholder element.
     * @param props - The properties for the ConfirmationDialog component.
     */
    LanguageConnectionCommandSet.prototype.renderDialogComponent = function (props) {
        var element = React.createElement(ConfirmationDialog_1.default, (0, react_1.assign)({
            onClose: null,
            currentTitle: "",
            currentMessage: "",
            isOpen: false,
        }, props));
        ReactDom.render(element, this.dialogPlaceHolder);
    };
    /**
     * Called when the command set is being disposed.
     * Cleans up the React component to prevent memory leaks.
     */
    LanguageConnectionCommandSet.prototype.onDispose = function () {
        if (this.dialogPlaceHolder) {
            ReactDom.unmountComponentAtNode(this.dialogPlaceHolder);
        }
    };
    /**
     * Updates the document GUID (language connection) for a given item in the list.
     * @param updateType - The type of update (CREATE or DELETE).
     * @param list - The SharePoint list instance.
     * @param id - The ID of the item to update.
     * @param updGuid - The updated GUID to set.
     * @param originalGuid - The original GUID before the update.
     * @returns A promise resolving to a status code indicating success or failure.
     */
    LanguageConnectionCommandSet.prototype.updateDocGuid = function (updateType, list, id, updGuid, originalGuid) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var retVal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        retVal = 0;
                        return [4 /*yield*/, list.items.getById(id).update({
                                pb_LangConn: updGuid
                            }).then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var filterQueryLangConn;
                                var _this = this;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(updateType == 'DELETE')) return [3 /*break*/, 2];
                                            filterQueryLangConn = "pb_LangConn eq '" + originalGuid + "'";
                                            return [4 /*yield*/, list.items.filter(filterQueryLangConn)().then(function (items) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                    return tslib_1.__generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                if (!(items.length == 1)) return [3 /*break*/, 2];
                                                                return [4 /*yield*/, list.items.getById(items[0].Id).update({
                                                                        pb_LangConn: ''
                                                                    }).catch(function (errorMsg) {
                                                                        var errMsgString = JSON.stringify(errorMsg);
                                                                        if (errMsgString.indexOf('423') > 0) {
                                                                            retVal = 423;
                                                                        }
                                                                    })];
                                                            case 1:
                                                                _a.sent();
                                                                _a.label = 2;
                                                            case 2: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); }).catch(function (errorMsg) {
                                var errMsgString = JSON.stringify(errorMsg);
                                if (errMsgString.indexOf('423') > 0) {
                                    retVal = 423;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, retVal];
                }
            });
        });
    };
    tslib_1.__decorate([
        decorators_1.override
    ], LanguageConnectionCommandSet.prototype, "onInit", null);
    tslib_1.__decorate([
        decorators_1.override
    ], LanguageConnectionCommandSet.prototype, "onListViewUpdated", null);
    tslib_1.__decorate([
        decorators_1.override
    ], LanguageConnectionCommandSet.prototype, "onExecute", null);
    tslib_1.__decorate([
        decorators_1.override
    ], LanguageConnectionCommandSet.prototype, "onDispose", null);
    return LanguageConnectionCommandSet;
}(sp_listview_extensibility_1.BaseListViewCommandSet));
exports.default = LanguageConnectionCommandSet;
//# sourceMappingURL=LanguageConnectionCommandSet.js.map