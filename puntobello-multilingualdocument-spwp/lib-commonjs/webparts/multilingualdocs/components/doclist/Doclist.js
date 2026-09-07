"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// React imports
var React = tslib_1.__importStar(require("react"));
// Fluent UI imports
var react_1 = require("@fluentui/react");
// File type icons initialization
var file_type_icons_1 = require("@uifabric/file-type-icons");
// Utility functions and helper methods
var utils_1 = require("../../utils");
// Initialize icons for document types
(0, file_type_icons_1.initializeFileTypeIcons)(undefined);
function Doclist(props) {
    // Destructuring props to extract docdata and language
    var docdata = props.docdata, language = props.language;
    // Memoizing the columns based on the current language to avoid unnecessary re-renders
    var columns = React.useMemo(function () { return (0, utils_1.getColumns)(language); }, [language]);
    // Recreating the docdata array by destructuring it.
    // This is crucial because the DetailsList component has its own performance optimization
    // that can prevent re-rendering when values change if the array reference remains the same.
    var items = tslib_1.__spreadArray([], docdata, true);
    return (React.createElement(react_1.DetailsList, { items: items, onRenderRow: utils_1.onRenderRow, columns: columns, selectionMode: react_1.SelectionMode.none, getKey: utils_1.getKey, setKey: "none", isHeaderVisible: true, ariaLabel: utils_1.Utility.getStringTranslation4Locale('DocListLabel', language), ariaLabelForListHeader: utils_1.Utility.getStringTranslation4Locale('DocListHeaderLabel', language) }));
}
exports.default = Doclist;
//# sourceMappingURL=Doclist.js.map