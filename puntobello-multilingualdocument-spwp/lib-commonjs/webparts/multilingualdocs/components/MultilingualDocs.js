"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var MultilingualDocs_module_scss_1 = tslib_1.__importDefault(require("./MultilingualDocs.module.scss"));
var WebPartTitle_1 = require("@pnp/spfx-controls-react/lib/WebPartTitle");
var Placeholder_1 = require("@pnp/spfx-controls-react/lib/Placeholder");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var Doccard_1 = tslib_1.__importDefault(require("./doccard/Doccard"));
var Doclist_1 = tslib_1.__importDefault(require("./doclist/Doclist"));
var useLoadCardData_1 = require("../hooks/useLoadCardData");
var react_1 = require("@fluentui/react");
var utils_1 = require("../utils");
var AppContext_1 = require("../contexts/AppContext");
var SharePointService_1 = tslib_1.__importDefault(require("../services/SharePointService"));
function MultilingualDocs(props) {
    var fUpdateProperty = props.fUpdateProperty, fPropertyPaneOpen = props.fPropertyPaneOpen;
    // Retrieve the SharePoint context, logger, and page language from the app context
    var _a = (0, AppContext_1.useAppContext)(), context = _a.context, pageLanguage = _a.pageLanguage, title = _a.title, cardLayout = _a.cardLayout, displayMode = _a.displayMode, collectionData = _a.collectionData, truncateLocale = _a.truncateLocale, upperCaseLocale = _a.upperCaseLocale;
    var docData = (0, useLoadCardData_1.useLoadCardData)(collectionData, context.serviceScope.consume(SharePointService_1.default.serviceKey), truncateLocale, upperCaseLocale);
    return (React.createElement("div", { className: MultilingualDocs_module_scss_1.default.multilingualdocs, style: (0, utils_1.getRootEnv)().css },
        React.createElement(WebPartTitle_1.WebPartTitle, { displayMode: displayMode, title: title, updateProperty: fUpdateProperty }),
        docData && docData.length > 0 ? (cardLayout === 'Cards' ? (React.createElement(react_1.Stack, { horizontal: true, horizontalAlign: "start", disableShrink: true, wrap: true, tokens: { childrenGap: 32 } }, docData.map(function (doc, index) { return (React.createElement(Doccard_1.default, { preview: doc.preview, targetUrl: doc.targetUrl, activity: doc.lastActivity, title: doc.docTitle, desc: doc.docDesc, relatedDocs: doc.relatedDocs, key: index, language: pageLanguage.Language })); }))) : (React.createElement(Doclist_1.default, { docdata: docData, language: pageLanguage.Language }))) : (displayMode === sp_core_library_1.DisplayMode.Edit && React.createElement(Placeholder_1.Placeholder, { iconName: 'Edit', iconText: utils_1.Utility.getStringTranslation4Locale('CollectionPanelHeader', pageLanguage.Language), description: utils_1.Utility.getStringTranslation4Locale('NoCardsConfigured', pageLanguage.Language), buttonLabel: utils_1.Utility.getStringTranslation4Locale('ConfigureCardsButtonLabel', pageLanguage.Language), onConfigure: fPropertyPaneOpen }))));
}
exports.default = MultilingualDocs;
//# sourceMappingURL=MultilingualDocs.js.map