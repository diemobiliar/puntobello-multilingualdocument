"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// React import for component creation
var React = tslib_1.__importStar(require("react"));
// Fluent UI components for rendering Document Cards and related elements
var DocumentCard_1 = require("@fluentui/react/lib/DocumentCard");
// Fluent UI components for buttons, overflow sets, and text
var react_1 = require("@fluentui/react");
// Utility functions used throughout the component
var utils_1 = require("../../utils");
// Custom styles for the Document Card component layout
var doccard_1 = require("../../styles/doccard");
/**
 * Renders an individual item in the OverflowSet, which is a link to a related document.
 *
 * @param item - The item to render, containing the link and name of the related document.
 * @returns A JSX.Element representing the link to the related document.
 */
var onRenderItem = function (item) {
    return (React.createElement("a", { href: item.link, className: doccard_1.cardLayoutStyles.documentCardLinkListItem, role: "listitem", rel: "noreferrer", target: "_blank", "data-interception": "off" }, item.name));
};
/**
 * Renders the overflow button in the OverflowSet, which provides additional options when there are too many items to display.
 *
 * @param overflowItems - The list of items that overflow and are not directly displayed.
 * @returns A JSX.Element representing the overflow button.
 */
var onRenderOverflowButton = function (overflowItems) {
    var buttonStyles = {
        root: {
            minWidth: 0,
            padding: '0 4px',
            alignSelf: 'stretch',
            height: 'auto',
        },
    };
    return (React.createElement(react_1.IconButton, { role: "menuitem", title: "More options", styles: buttonStyles, menuIconProps: { iconName: 'More' }, menuProps: { items: overflowItems } }));
};
/**
 * The main component that renders a document card with a preview, title, description, and related documents.
 *
 * @param props - The properties passed to the Doccard component, including preview, targetUrl, activity, title, desc, relatedDocs, and language.
 * @returns A JSX.Element representing the document card layout.
 */
function Doccard(props) {
    var preview = props.preview, // Document preview image or icon
    targetUrl = props.targetUrl, // URL to the document
    activity = props.activity, // Recent activity or date related to the document
    title = props.title, // Title of the document
    desc = props.desc, // Description of the document
    relatedDocs = props.relatedDocs, // Related documents with language and links
    language = props.language // Language for translation purposes
    ;
    /**
     * The normal layout for the document card, including the preview, title, and related documents.
     */
    var layoutNormal = (React.createElement("a", { href: targetUrl, className: doccard_1.cardLayoutStyles.documentCardLinkCard, target: "_blank", "data-interception": "off", rel: "noreferrer" },
        React.createElement(DocumentCard_1.DocumentCard, { "aria-label": title, type: DocumentCard_1.DocumentCardType.compact, className: doccard_1.cardLayoutStyles.documentCardSmall },
            React.createElement(DocumentCard_1.DocumentCardPreview, tslib_1.__assign({}, preview, { className: doccard_1.cardLayoutStyles.DocumentCardPreview })),
            React.createElement(DocumentCard_1.DocumentCardDetails, null,
                React.createElement(DocumentCard_1.DocumentCardTitle, { title: title, className: doccard_1.cardLayoutStyles.cardTitle }),
                React.createElement(react_1.OverflowSet, { "aria-label": utils_1.Utility.getStringTranslation4Locale('LanguageList', language), role: "list", items: relatedDocs.map(function (doc) {
                        return {
                            key: doc.key,
                            name: doc.langCd,
                            link: doc.Url,
                            target: doc.target
                        };
                    }), className: doccard_1.cardLayoutStyles.documentCardLinkList, onRenderItem: onRenderItem, onRenderOverflowButton: onRenderOverflowButton }),
                React.createElement(react_1.Text, { nowrap: true, block: true, className: doccard_1.cardLayoutStyles.documentCardDate }, activity)))));
    return layoutNormal;
}
exports.default = Doccard;
//# sourceMappingURL=Doccard.js.map