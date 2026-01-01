"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// React core imports for component creation and rendering
var React = tslib_1.__importStar(require("react"));
var ReactDom = tslib_1.__importStar(require("react-dom"));
// SharePoint Framework (SPFx) core imports for web part development
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_property_pane_1 = require("@microsoft/sp-property-pane");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
// SPFx Property Controls for enhancing the Property Pane functionality
var PropertyFieldCollectionData_1 = require("@pnp/spfx-property-controls/lib/PropertyFieldCollectionData");
var PropertyFieldOrder_1 = require("@pnp/spfx-property-controls/lib/PropertyFieldOrder");
var FilePicker_1 = require("@pnp/spfx-controls-react/lib/FilePicker");
// Fluent UI and theming imports for UI components and theming support
var sp_component_base_1 = require("@microsoft/sp-component-base");
// Utility and Logger imports for logging and shared functionalities
var utils_1 = require("./utils");
// Service and model imports for SharePoint data handling and types
var SharePointService_1 = tslib_1.__importDefault(require("./services/SharePointService"));
// Context and component imports for managing and rendering the main application
var MultilingualDocs_1 = tslib_1.__importDefault(require("./components/MultilingualDocs"));
var AppContext_1 = require("./contexts/AppContext");
// Specific component imports for custom UI components
var orderedItem_1 = require("./components/fieldOrderItem/orderedItem");
/**
 * This class defines the MultilingualDocsWebPart, a SharePoint web part that handles multilingual document display
 * with configurable properties through the property pane. It leverages Fluent UI and the SPFx framework.
 */
var MultilingualDocsWebPart = /** @class */ (function (_super) {
    tslib_1.__extends(MultilingualDocsWebPart, _super);
    function MultilingualDocsWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.initialized = false; // Flag to track whether the web part has been initialized
        return _this;
    }
    Object.defineProperty(MultilingualDocsWebPart.prototype, "propertiesMetadata", {
        /**
         * Specifies that the indexableContent property is searchable as plain text.
         * This property is set in the onAfterDeserialize method with the document title so that the documents can be indexed and searched on the page.
         */
        get: function () {
            return {
                'indexableContent': { isSearchablePlainText: true } // Indicates that the indexableContent property is searchable as plain text
            };
        },
        enumerable: false,
        configurable: true
    });
    MultilingualDocsWebPart.prototype.onInit = function () {
        var _a, _b, _c, _d;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var listId, listItemId, language, _e, error_1;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        this.logger = utils_1.Logger.getInstance();
                        this.logger.setContextInfo(this.context.manifest.alias + " with id " + this.context.manifest.id);
                        this.logger.info('Logger initialized');
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 4, , 5]);
                        this._themeProvider = this.context.serviceScope.consume(sp_component_base_1.ThemeProvider.serviceKey);
                        this._themeVariant = this._themeProvider.tryGetTheme();
                        this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);
                        listId = (_b = (_a = this.context.pageContext.list) === null || _a === void 0 ? void 0 : _a.id.toString()) !== null && _b !== void 0 ? _b : '';
                        listItemId = (_d = (_c = this.context.pageContext.listItem) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : 0;
                        language = this.context.pageContext.web.language;
                        return [4 /*yield*/, _super.prototype.onInit.call(this)];
                    case 2:
                        _f.sent();
                        this.spo = this.context.serviceScope.consume(SharePointService_1.default.serviceKey);
                        _e = this;
                        return [4 /*yield*/, this.spo.calculateLanguage(listId, listItemId, language)];
                    case 3:
                        _e.pageLanguage = _f.sent();
                        this.initialized = true;
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _f.sent();
                        this.logger.error("Error in onInit Webpart: ", error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MultilingualDocsWebPart.prototype.render = function () {
        var _this = this;
        var _a, _b;
        if (this.initialized) {
            var appContext = new AppContext_1.AppContext(this.context, this.logger, this.pageLanguage, this.properties.title, this.properties.cardLayout, this.properties.collectionData, this.displayMode, (_a = this.properties.truncateLocale) !== null && _a !== void 0 ? _a : false, (_b = this.properties.upperCaseLocale) !== null && _b !== void 0 ? _b : false);
            var element = React.createElement(AppContext_1.AppContextProvider, { appContext: appContext }, React.createElement(MultilingualDocs_1.default, {
                fUpdateProperty: function (value) {
                    _this.properties.title = value;
                    _this.render();
                },
                fPropertyPaneOpen: this.context.propertyPane.open,
            }));
            ReactDom.render(element, this.domElement);
        }
    };
    MultilingualDocsWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(MultilingualDocsWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    MultilingualDocsWebPart.prototype._handleThemeChangedEvent = function (args) {
        this._themeVariant = args.theme;
        this.render();
    };
    /**
     * Loads the resources required for the property pane.
     * @returns {Promise<void>} A promise that resolves when the property pane resources are loaded.
     */
    MultilingualDocsWebPart.prototype.loadPropertyPaneResources = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.customCollectionFieldType = PropertyFieldCollectionData_1.CustomCollectionFieldType;
                return [2 /*return*/];
            });
        });
    };
    /**
     * Called after deserialization of the web part properties.
     * Updates the indexable content based on the collection data.
     * @param {any} deserializedObject - The deserialized web part object.
     * @param {Version} dataVersion - The version of the data.
     * @returns {IMultilingualDocsWP} The updated web part properties.
     */
    MultilingualDocsWebPart.prototype.onAfterDeserialize = function (deserializedObject, dataVersion) {
        var indexableString = '';
        if (deserializedObject.collectionData) {
            deserializedObject.collectionData.forEach(function (obj) {
                // Add the document title to the indexable content
                // if other properties are needed, update here
                indexableString += obj.doctitle + '; ';
            });
            deserializedObject.indexableContent = indexableString;
        }
        return _super.prototype.onAfterDeserialize.call(this, deserializedObject, dataVersion);
    };
    /**
     * Configures the property pane for this web part, including layout options, locale settings, and document collection management.
     * @returns {IPropertyPaneConfiguration} The configuration of the property pane.
     */
    MultilingualDocsWebPart.prototype.getPropertyPaneConfiguration = function () {
        var _this = this;
        var cardLayout = this.properties.cardLayout;
        // Show the upperCaseLocale toggle only if the truncateLocale toggle is enabled
        var templatePropertyUpperCaseLanguage;
        if (this.properties.truncateLocale) {
            templatePropertyUpperCaseLanguage =
                (0, sp_property_pane_1.PropertyPaneToggle)('upperCaseLocale', {
                    label: utils_1.Utility.getStringTranslation4Locale('upperCaseLocale', this.pageLanguage.Language),
                });
        }
        else {
            templatePropertyUpperCaseLanguage = "";
        }
        return {
            pages: [
                {
                    header: {
                        description: utils_1.Utility.getStringTranslation4Locale('PropertyPaneDescription', this.pageLanguage.Language)
                    },
                    groups: [
                        {
                            groupFields: [
                                // Choose the layout type for the document between Cards and List
                                (0, sp_property_pane_1.PropertyPaneChoiceGroup)("cardLayout", {
                                    label: utils_1.Utility.getStringTranslation4Locale('LayoutType', this.pageLanguage.Language),
                                    options: [
                                        {
                                            key: "Cards",
                                            text: utils_1.Utility.getStringTranslation4Locale('CardsLayout', this.pageLanguage.Language),
                                            iconProps: { officeFabricIconFontName: "Tiles" },
                                            checked: cardLayout === "Tiles" ? true : false
                                        },
                                        {
                                            key: "List",
                                            text: utils_1.Utility.getStringTranslation4Locale('ListLayout', this.pageLanguage.Language),
                                            iconProps: { officeFabricIconFontName: "List" },
                                            checked: cardLayout === "List" ? true : false
                                        },
                                    ]
                                }),
                                // Toggle to enable/disable the truncation of the locale
                                // eg. en-US -> en
                                (0, sp_property_pane_1.PropertyPaneToggle)('truncateLocale', {
                                    label: utils_1.Utility.getStringTranslation4Locale('truncateLocale', this.pageLanguage.Language),
                                }),
                                // Inject template for upperCaseLocale toggle
                                // if present, en -> EN
                                templatePropertyUpperCaseLanguage,
                                // collection which contains all the selected file to be shown in the document card/list
                                (0, PropertyFieldCollectionData_1.PropertyFieldCollectionData)("collectionData", {
                                    key: "collectionData",
                                    label: utils_1.Utility.getStringTranslation4Locale('DataLabel', this.pageLanguage.Language),
                                    panelHeader: utils_1.Utility.getStringTranslation4Locale('PanelHeader', this.pageLanguage.Language),
                                    panelDescription: utils_1.Utility.getStringTranslation4Locale('panelDescription', this.pageLanguage.Language),
                                    manageBtnLabel: utils_1.Utility.getStringTranslation4Locale('ManageBtn', this.pageLanguage.Language),
                                    value: this.properties.collectionData,
                                    disabled: false,
                                    enableSorting: true,
                                    fields: [
                                        {
                                            id: "filePicker",
                                            title: utils_1.Utility.getStringTranslation4Locale('filePickerTitle', this.pageLanguage.Language),
                                            type: PropertyFieldCollectionData_1.CustomCollectionFieldType.custom,
                                            onCustomRender: function (field, value, onUpdate, item, itemId, onError) {
                                                return (React.createElement(FilePicker_1.FilePicker, {
                                                    key: itemId,
                                                    context: _this.context,
                                                    buttonLabel: utils_1.Utility.getStringTranslation4Locale('filePickerButtonLabel', _this.pageLanguage.Language),
                                                    buttonIcon: 'FileImage',
                                                    hideRecentTab: true,
                                                    hideWebSearchTab: true,
                                                    hideLocalUploadTab: true,
                                                    hideLinkUploadTab: true,
                                                    onChange: function (selectedFile) {
                                                        onUpdate(field.id, selectedFile[0]);
                                                    },
                                                    // Get the current file and populate the document title, language code, and URL
                                                    onSave: function (filePickerResult) {
                                                        _this.spo.getItemFromFileUrl(filePickerResult[0].fileAbsoluteUrl).then(function (i) {
                                                            if (i['Title'] != null) {
                                                                onUpdate('doctitle', i['Title']);
                                                            }
                                                            else {
                                                                onUpdate('doctitle', utils_1.Utility.getStringTranslation4Locale('docHasNoTitleProps', _this.pageLanguage.Language));
                                                            }
                                                            if (i['pb_LangCd'] != null) {
                                                                onUpdate('doclangcd', i['pb_LangCd']);
                                                            }
                                                            else {
                                                                onUpdate('doclangcd', utils_1.Utility.getStringTranslation4Locale('docHasNoLanguageCode', _this.pageLanguage.Language));
                                                            }
                                                            onUpdate('docurl', filePickerResult[0].fileAbsoluteUrl);
                                                            onUpdate('docurlhidden', filePickerResult[0].fileAbsoluteUrl);
                                                        });
                                                    }
                                                }));
                                            }
                                        },
                                        {
                                            // Hidden field to store the URL of the document
                                            // Depending if the URL is a SharePoint URL or a direct link
                                            // we populate the document title and language code and the hidden URL
                                            // These fields will then be used to display the documents / gather info from the file in the web part
                                            id: "docurl",
                                            title: utils_1.Utility.getStringTranslation4Locale('docUrlField', this.pageLanguage.Language),
                                            type: PropertyFieldCollectionData_1.CustomCollectionFieldType.string,
                                            deferredValidationTime: 420,
                                            onGetErrorMessage: function (value, index, item) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                var retMsg, currentSCNameFromFile, siteUrl, siteTenantName, spIsLink, spIsLinkPosition, scShort, scShort, scShort, currWebUrl_1;
                                                var _this = this;
                                                return tslib_1.__generator(this, function (_a) {
                                                    retMsg = '';
                                                    currentSCNameFromFile = '';
                                                    // Retrieve the document
                                                    if (value.indexOf('https://') == 0) {
                                                        siteUrl = this.context.pageContext.site.absoluteUrl;
                                                        siteTenantName = siteUrl.substring(0, siteUrl.lastIndexOf('/'));
                                                        spIsLink = RegExp('\/:[a-z]:\/[a-z]\/');
                                                        spIsLinkPosition = value.search(spIsLink);
                                                        if (spIsLinkPosition > 0) {
                                                            // We have a short sp url, check if we find the pattern /sites/
                                                            //eslint-disable-next-line
                                                            if (value.indexOf('\/sites\/') > 0) {
                                                                scShort = value.substring(value.indexOf('\/sites\/') + 7, value.length);
                                                                currentSCNameFromFile = scShort.substring(0, scShort.indexOf('/'));
                                                            }
                                                            else {
                                                                scShort = value.substring(spIsLinkPosition + 7, value.length);
                                                                currentSCNameFromFile = scShort.substring(0, scShort.indexOf('/'));
                                                            }
                                                        }
                                                        else {
                                                            scShort = value.substring(value.indexOf('\/sites\/') + 7, value.length);
                                                            currentSCNameFromFile = scShort.substring(0, scShort.indexOf('/'));
                                                        }
                                                        currWebUrl_1 = siteTenantName + '/' + currentSCNameFromFile;
                                                        item.docweburl = currWebUrl_1;
                                                        this.spo.checkFileExistsForWeb(currWebUrl_1, value).then(function (spfileexists) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                            var _this = this;
                                                            return tslib_1.__generator(this, function (_a) {
                                                                if (spfileexists) {
                                                                    this.spo.getItemFromWebFromFileUrl(currWebUrl_1, value).then(function (i) {
                                                                        if (i['Title'] != null) {
                                                                            item.doctitle = i['Title'];
                                                                        }
                                                                        else {
                                                                            item.doctitle = utils_1.Utility.getStringTranslation4Locale('docHasNoTitleProps', _this.pageLanguage.Language);
                                                                        }
                                                                        if (i['pb_LangCd'] != null) {
                                                                            item.doclangcd = i['pb_LangCd'];
                                                                        }
                                                                        else {
                                                                            item.doclangcd = utils_1.Utility.getStringTranslation4Locale('docHasNoLanguageCode', _this.pageLanguage.Language);
                                                                        }
                                                                    });
                                                                    this.spo.getFromWebExpandedFileItem(currWebUrl_1, value).then(function (f) {
                                                                        var currDocUrl = f.File.ServerRelativeUrl;
                                                                        item.docurlhidden = currDocUrl;
                                                                    });
                                                                }
                                                                else {
                                                                    retMsg = utils_1.Utility.getStringTranslation4Locale('errorDocNotFound', this.pageLanguage.Language);
                                                                    item.doctitle = '';
                                                                    item.docurlhidden = '';
                                                                    item.doclangcd = '';
                                                                }
                                                                return [2 /*return*/];
                                                            });
                                                        }); });
                                                    }
                                                    return [2 /*return*/, retMsg];
                                                });
                                            }); },
                                            required: true,
                                            disableEdit: false
                                        },
                                        {
                                            id: "doctitle",
                                            title: utils_1.Utility.getStringTranslation4Locale('docTitleField', this.pageLanguage.Language),
                                            type: PropertyFieldCollectionData_1.CustomCollectionFieldType.custom,
                                            onCustomRender: function (field, value, onUpdate, item, itemId) {
                                                return (React.createElement("div", { key: itemId }, value));
                                            },
                                            required: false,
                                            disableEdit: false
                                        },
                                        {
                                            id: "doclangcd",
                                            title: utils_1.Utility.getStringTranslation4Locale('docLanguageField', this.pageLanguage.Language),
                                            type: PropertyFieldCollectionData_1.CustomCollectionFieldType.custom,
                                            onCustomRender: function (field, value, onUpdate, item, itemId) {
                                                return (React.createElement("div", { key: itemId }, value));
                                            },
                                            required: false,
                                            disableEdit: false
                                        },
                                        {
                                            id: "docweburl",
                                            title: "",
                                            type: PropertyFieldCollectionData_1.CustomCollectionFieldType.custom,
                                            onCustomRender: function (field, value, onUpdate, item, itemId) {
                                                return (React.createElement("div"));
                                            },
                                            required: false,
                                            disableEdit: true
                                        },
                                        {
                                            id: "docurlhidden",
                                            title: "",
                                            type: PropertyFieldCollectionData_1.CustomCollectionFieldType.custom,
                                            onCustomRender: function (field, value, onUpdate, item, itemId) {
                                                return (React.createElement("div"));
                                            },
                                            required: false,
                                            disableEdit: true
                                        }
                                    ]
                                }),
                                // Copntrol to reorder the documents in the collection
                                (0, PropertyFieldOrder_1.PropertyFieldOrder)("orderedItems", {
                                    key: "orderedItems",
                                    label: utils_1.Utility.getStringTranslation4Locale('orderingLabel', this.pageLanguage.Language),
                                    items: this.properties.collectionData,
                                    onRenderItem: orderedItem_1.orderedItem,
                                    properties: this.properties,
                                    onPropertyChange: function (path, oldVal, newVal) {
                                        _this.properties.collectionData = tslib_1.__spreadArray([], newVal, true);
                                    }
                                }),
                                // Field with the indexable content for search
                                // The field is not protected and is always visible
                                (0, sp_property_pane_1.PropertyPaneTextField)("indexableContent", {}),
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return MultilingualDocsWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
exports.default = MultilingualDocsWebPart;
//# sourceMappingURL=MultilingualDocsWebPart.js.map