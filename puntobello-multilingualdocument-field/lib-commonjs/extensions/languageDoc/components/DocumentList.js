"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// React and related libraries for UI components
var React = tslib_1.__importStar(require("react"));
// Fluent UI components for building the user interface
var Stack_1 = require("@fluentui/react/lib/Stack");
var Icon_1 = require("@fluentui/react/lib/Icon");
// Custom styling and utility functions
var LanguageDoc_module_scss_1 = tslib_1.__importDefault(require("./LanguageDoc.module.scss"));
var utils_1 = require("../utils/utils");
var utils_2 = require("../utils");
/**
 * Component to render a list of documents with language-specific details.
 *
 * @param {IDocumentList} props - The properties passed to the component.
 * @param {string} props.currentUICultureName - The current UI culture name to be used for localization.
 * @param {Array} props.docItems - An array of document items that need to be displayed.
 *
 * @returns {JSX.Element} A React component that displays the list of documents with icons and links.
 */
function DocumentList(props) {
    var currentUICultureName = props.currentUICultureName, // The language/culture of the UI used for translation strings
    docItems = props.docItems // The list of document items to be displayed
    ;
    return (React.createElement("div", { className: LanguageDoc_module_scss_1.default.cell },
        React.createElement("div", { className: LanguageDoc_module_scss_1.default.totalDiv },
            utils_1.Utility.getStringTranslation4Locale('totalLabel', currentUICultureName),
            "\u00A0",
            docItems.length),
        React.createElement("div", null, docItems.map(function (docItem, index) { return (React.createElement(Stack_1.Stack, { horizontal: true, verticalAlign: "center", key: index },
            React.createElement(Icon_1.Icon, { iconName: (0, utils_2.getIconNameByFileName)(docItem.File.Name) }),
            "\u00A0",
            docItem.pb_LangCd,
            "\u00A0",
            React.createElement("a", { href: docItem.File.ServerRelativeUrl, target: "_blank", "data-interception": "off", rel: "noreferrer", className: LanguageDoc_module_scss_1.default.link }, docItem.Title))); }))));
}
exports.default = DocumentList;
//# sourceMappingURL=DocumentList.js.map