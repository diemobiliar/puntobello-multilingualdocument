"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// React import for building components
var React = tslib_1.__importStar(require("react"));
// CSS module import for styling the LanguageDoc component
var LanguageDoc_module_scss_1 = tslib_1.__importDefault(require("./LanguageDoc.module.scss"));
// Utility functions for various helper methods
var utils_1 = require("../utils");
/**
 * Component to display a message indicating that no documents are available.
 *
 * @param {INoDocuments} props - The properties passed to the component.
 * @param {string} props.currentUICultureName - The current UI culture name to be used for localization.
 *
 * @returns {JSX.Element} A React component that displays an icon and a message when no documents are found.
 */
function NoDocuments(props) {
    var currentUICultureName = props.currentUICultureName // The language/culture of the UI used for translation strings
    ;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: LanguageDoc_module_scss_1.default.noDocContainer },
            React.createElement("p", { className: LanguageDoc_module_scss_1.default.noDoc }, "x"),
            React.createElement("div", null, utils_1.Utility.getStringTranslation4Locale('NoDocMsg', currentUICultureName)))));
}
exports.default = NoDocuments;
//# sourceMappingURL=NoDocuments.js.map