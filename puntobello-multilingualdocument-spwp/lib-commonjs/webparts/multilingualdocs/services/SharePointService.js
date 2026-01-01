"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_page_context_1 = require("@microsoft/sp-page-context");
var sp_1 = require("@pnp/sp");
require("@pnp/sp/regional-settings/web");
require("@pnp/sp/fields");
require("@pnp/sp/webs");
require("@pnp/sp/site-users/web");
require("@pnp/sp/lists");
require("@pnp/sp/items");
require("@pnp/sp/files");
var logger_1 = require("../utils/logger");
var lcid = tslib_1.__importStar(require("lcid"));
var SharePointService = /** @class */ (function () {
    function SharePointService(serviceScope) {
        var _this = this;
        this.getPageContext = function (listId, listItemId) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var fields, requiredFields, fieldNames, allFieldsExist, context;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sp.web.lists.getById(listId).fields()];
                    case 1:
                        fields = _a.sent();
                        requiredFields = ['OData__SPIsTranslation', 'OData__SPTranslationLanguage'];
                        fieldNames = fields.map(function (field) { return field.InternalName; });
                        allFieldsExist = requiredFields.every(function (field) { return fieldNames.includes(field); });
                        if (!!allFieldsExist) return [3 /*break*/, 2];
                        return [2 /*return*/, null];
                    case 2: return [4 /*yield*/, this.sp.web.lists.getById(listId)
                            .items
                            .getById(listItemId)
                            .select('OData__SPIsTranslation', 'OData__SPTranslationLanguage')()];
                    case 3:
                        context = _a.sent();
                        return [2 /*return*/, context];
                }
            });
        }); };
        this.calculateLanguage = function (listId, listItemId, defaultLanguage) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var pageContext, languageData, error_1;
            var _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        pageContext = null;
                        languageData = {
                            lcid: 0,
                            Language: '',
                            LanguageLC: '',
                            LanguageDashed: '',
                            LanguageDashedLC: '',
                        };
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getPageContext(listId, listItemId)];
                    case 2:
                        pageContext = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _c.sent();
                        this.logger.info("calculateLanguage, getPageContext returned an error, probably not running in a multilingual setup, defaulting to web language", error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        if (!pageContext || !pageContext.OData__SPIsTranslation || !pageContext.OData__SPTranslationLanguage) {
                            // Not running in a multilingual setup
                            // Get language from web
                            languageData.lcid = defaultLanguage;
                            languageData.Language = (_a = lcid.from(defaultLanguage)) !== null && _a !== void 0 ? _a : '';
                            languageData.LanguageLC = languageData.Language.toLowerCase();
                            languageData.LanguageDashed = languageData.Language.replace('_', '-');
                            languageData.LanguageDashedLC = languageData.LanguageLC.replace('_', '-');
                            return [2 /*return*/, languageData];
                        }
                        // Page is a translation
                        // Get language from page property
                        languageData.lcid = (_b = lcid.to(pageContext.OData__SPTranslationLanguage)) !== null && _b !== void 0 ? _b : 0;
                        languageData.Language = pageContext.OData__SPTranslationLanguage;
                        languageData.LanguageLC = languageData.Language.toLowerCase();
                        languageData.LanguageDashed = languageData.Language.replace('_', '-');
                        languageData.LanguageDashedLC = languageData.LanguageLC.replace('_', '-');
                        return [2 /*return*/, languageData];
                }
            });
        }); };
        this.logger = logger_1.Logger.getInstance();
        serviceScope.whenFinished(function () {
            _this.pageContext = serviceScope.consume(sp_page_context_1.PageContext.serviceKey);
            _this.sp = (0, sp_1.spfi)().using((0, sp_1.SPFx)({ pageContext: _this.pageContext }));
        });
    }
    SharePointService.prototype.getItemFromFileUrl = function (fileUrl) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var spitem, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.sp.web.getFileByUrl(fileUrl).getItem()];
                    case 1:
                        spitem = _a.sent();
                        return [2 /*return*/, spitem];
                    case 2:
                        error_2 = _a.sent();
                        this.logger.error("Error getting item from file URL:", error_2);
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SharePointService.prototype.checkFileExistsForWeb = function (currWebUrl, fileUrl) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var currsp, spFileExists, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        currsp = (0, sp_1.spfi)(currWebUrl).using((0, sp_1.SPFx)({ pageContext: this.pageContext }));
                        return [4 /*yield*/, currsp.web.getFileByUrl(fileUrl).exists()];
                    case 1:
                        spFileExists = _a.sent();
                        return [2 /*return*/, spFileExists];
                    case 2:
                        error_3 = _a.sent();
                        this.logger.error("Error checking if file exists:", error_3);
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SharePointService.prototype.getItemFromWebFromFileUrl = function (currWebUrl, fileUrl) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var currsp, spitem, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        currsp = (0, sp_1.spfi)(currWebUrl).using((0, sp_1.SPFx)({ pageContext: this.pageContext }));
                        return [4 /*yield*/, currsp.web.getFileByUrl(fileUrl).getItem()];
                    case 1:
                        spitem = _a.sent();
                        return [2 /*return*/, spitem];
                    case 2:
                        error_4 = _a.sent();
                        this.logger.error("Error getting item from web from file url:", error_4);
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SharePointService.prototype.getFromWebExpandedFileItem = function (currWebUrl, fileUrl) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var currsp, spfile, error_5;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        currsp = (0, sp_1.spfi)(currWebUrl).using((0, sp_1.SPFx)({ pageContext: this.pageContext }));
                        return [4 /*yield*/, currsp.web.getFileByUrl(fileUrl).getItem().then(function (item) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, item.select('File').expand('File')()];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); })];
                    case 1:
                        spfile = _a.sent();
                        return [2 /*return*/, spfile];
                    case 2:
                        error_5 = _a.sent();
                        this.logger.error("Error expanding file item:", error_5);
                        throw error_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SharePointService.prototype.getFilteredExpandedItems = function (currWebUrl, listId, filterQuery) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var currsp, items, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        currsp = (0, sp_1.spfi)(currWebUrl).using((0, sp_1.SPFx)({ pageContext: this.pageContext }));
                        return [4 /*yield*/, currsp.web.lists.getById(listId).items.filter(filterQuery).expand('File')()];
                    case 1:
                        items = _a.sent();
                        return [2 /*return*/, items];
                    case 2:
                        error_6 = _a.sent();
                        this.logger.error("Error getting filtered and expanded items:", error_6);
                        throw error_6;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SharePointService.serviceKey = sp_core_library_1.ServiceKey.create('SPFx:SharePointService', SharePointService);
    return SharePointService;
}());
exports.default = SharePointService;
//# sourceMappingURL=SharePointService.js.map