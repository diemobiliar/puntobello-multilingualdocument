"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderedItem = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_1 = require("@fluentui/react");
var Icon_1 = require("@fluentui/react/lib/Icon");
var file_type_icons_1 = require("@uifabric/file-type-icons");
// Initialize the default set of file type icons for the application.
// This function is typically called once during the application initialization.
(0, file_type_icons_1.initializeFileTypeIcons)(undefined);
// Styles used for the file icon images displayed in the ordered list items.
var orderedItemStyles = (0, react_1.mergeStyleSets)({
    fileIconImg: {
        verticalAlign: "middle", // Align the icon vertically in the middle of the container
        padding: "0px 4px 0px 0px", // Add padding to the right of the icon
        maxHeight: "16px", // Set the maximum height of the icon to 16 pixels
        maxWidth: "16px", // Set the maximum width of the icon to 16 pixels
    },
});
/**
 * Generates a JSX element representing an ordered item in a list.
 * This function is used to render items in a collection, displaying a file icon and a truncated document title.
 *
 * @param {any} item - The item object containing document data, including the URL and title.
 * @param {number} index - The index of the item in the list (unused in this function).
 *
 * @returns {JSX.Element} - A JSX element containing an icon corresponding to the file type and a truncated document title.
 */
var orderedItem = function (item, index) {
    // Extract the file extension from the document URL
    var fullPath = item.docurlhidden;
    var lastPoint = fullPath.lastIndexOf('.');
    var currFileType;
    // Determine the file extension, defaulting to 'ENF' (Extension Not Found) if none is present
    if (lastPoint > 0) {
        currFileType = fullPath.substring(lastPoint + 1, fullPath.length);
    }
    else {
        currFileType = 'ENF';
    }
    // Truncate the document title if it exceeds 33 characters
    var docTitle = item.doctitle.length > 33 ? item.doctitle.substr(0, 33) + '...' : item.doctitle;
    return (React.createElement("span", null,
        React.createElement(Icon_1.Icon, tslib_1.__assign({}, (0, file_type_icons_1.getFileTypeIconProps)({ extension: currFileType, size: 16, imageFileType: 'svg' }), { className: orderedItemStyles.fileIconImg })),
        docTitle));
};
exports.orderedItem = orderedItem;
//# sourceMappingURL=orderedItem.js.map