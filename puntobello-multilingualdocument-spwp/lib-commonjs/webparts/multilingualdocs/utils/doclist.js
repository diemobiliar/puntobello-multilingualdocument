"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColumns = exports.getKey = exports.onRenderRow = exports.onRenderOverflowButton = exports.onRenderItem = void 0;
var tslib_1 = require("tslib");
// React and Fluent UI imports
var React = tslib_1.__importStar(require("react"));
var react_1 = require("@fluentui/react");
var Icon_1 = require("@fluentui/react/lib/Icon");
// Utility functions and environment configuration
var utils_1 = require("./utils");
var envconfig_1 = require("./envconfig");
var doclist_1 = require("../styles/doclist");
var multilingdocs_1 = require("./multilingdocs");
var rootEnv = (0, envconfig_1.getRootEnv)();
/**
 * Renders an item as a link within the document card list. The link opens in a new tab.
 *
 * @param {any} item - The item to render, which contains a link and name.
 * @returns {JSX.Element} A JSX element representing the rendered link.
 */
var onRenderItem = function (item) { return (React.createElement("a", { href: item.link, className: doclist_1.docListLayoutStyles.documentCardLinkListItemLanguage, role: "listitem", rel: "noreferrer", target: "_blank", "data-interception": "off" }, item.name)); };
exports.onRenderItem = onRenderItem;
/**
 * Renders the overflow button for the list item in the document card. The button shows more options when clicked.
 *
 * @param {any[]} overflowItems - The items to show in the overflow menu.
 * @param {string} language - The language code for localization purposes.
 * @returns {JSX.Element} A JSX element representing the rendered overflow button.
 */
var onRenderOverflowButton = function (overflowItems, language) {
    var buttonStyles = {
        root: {
            minWidth: 0,
            padding: '0 4px',
            alignSelf: 'stretch',
            height: 'auto',
        },
    };
    return (React.createElement(react_1.IconButton, { role: "menuitem", title: utils_1.Utility.getStringTranslation4Locale('docListMoreOptions', language), styles: buttonStyles, menuIconProps: { iconName: 'More' }, menuProps: { items: overflowItems } }));
};
exports.onRenderOverflowButton = onRenderOverflowButton;
/**
 * Custom row renderer for the DetailsList. It wraps each row in a link that opens in a new tab.
 * The background color changes on hover based on the theme settings.
 *
 * @param {IDetailsListProps['onRenderRow']} props - The properties for rendering the row.
 * @param {function} defaultRender - The default render method for the row.
 * @returns {JSX.Element} A JSX element representing the rendered row.
 */
var onRenderRow = function (props, defaultRender) {
    var _a;
    if (!props)
        return null;
    return (React.createElement("a", { href: props.item.targetUrl, className: doclist_1.docListLayoutStyles.documentCardLinkListTarget, target: "_blank", "data-interception": "off", rel: "noreferrer" }, defaultRender && defaultRender(tslib_1.__assign(tslib_1.__assign({}, props), { columns: (_a = props.columns) !== null && _a !== void 0 ? _a : [], styles: {
            root: {
                selectors: {
                    '&:hover': {
                        'background-color': rootEnv.css['--spfx_theme_color_bright_grey'],
                    },
                },
            },
        } }))));
};
exports.onRenderRow = onRenderRow;
/**
 * Generates a unique key for each item in the list, using the index as the key.
 *
 * @param {any} item - The item in the list.
 * @param {number} [index] - The index of the item in the list.
 * @returns {string} The key for the item.
 */
var getKey = function (item, index) {
    return (index !== null && index !== void 0 ? index : 0).toString();
};
exports.getKey = getKey;
/**
 * Configures the columns for the DetailsList based on the current language and screen size.
 * It adjusts the columns to show more or less information depending on the screen width.
 *
 * @param {string} language - The language code for localization purposes.
 * @returns {IColumn[]} An array of column configurations for the DetailsList.
 */
var getColumns = function (language) {
    var commonColumns = [
        {
            key: "column1",
            name: utils_1.Utility.getStringTranslation4Locale('docListFileType', language),
            className: doclist_1.docListLayoutStyles.fileIconCell,
            styles: doclist_1.headerStyle,
            iconClassName: doclist_1.docListLayoutStyles.fileIconHeaderIcon,
            iconName: "Page",
            isIconOnly: true,
            fieldName: "name",
            minWidth: 12,
            maxWidth: 48,
            onRender: function (item) {
                var _a;
                var _b = (0, multilingdocs_1.getIconNameByFileType)((_a = item.fileType) !== null && _a !== void 0 ? _a : ''), iconName = _b.iconName, iconColor = _b.iconColor;
                return (React.createElement(Icon_1.FontIcon, { iconName: iconName, className: "".concat(doclist_1.docListLayoutStyles.fileIconImg), style: { color: iconColor } }));
            }
        },
        {
            key: "column2",
            name: utils_1.Utility.getStringTranslation4Locale('docListName', language),
            fieldName: "name",
            styles: doclist_1.headerStyle,
            minWidth: 110,
            maxWidth: 950,
            data: "string",
            onRender: function (item) {
                return React.createElement("span", { className: doclist_1.docListLayoutStyles.fileTitle }, item.docTitle);
            },
            isPadded: true
        }
    ];
    if (window.innerWidth < 768) {
        return tslib_1.__spreadArray(tslib_1.__spreadArray([], commonColumns, true), [
            {
                key: "column3",
                name: utils_1.Utility.getStringTranslation4Locale('docListLanguages', language),
                fieldName: "docLanguages",
                styles: doclist_1.headerStyle,
                minWidth: 70,
                maxWidth: 100,
                isResizable: false,
                data: "string",
                onRender: function (item) {
                    return (React.createElement(react_1.OverflowSet, { "aria-label": utils_1.Utility.getStringTranslation4Locale('LanguageList', language), role: "list", items: item.relatedDocs.map(function (doc) { return ({
                            key: doc.key,
                            name: doc.langCd,
                            link: doc.Url,
                            target: doc.target
                        }); }), className: doclist_1.docListLayoutStyles.documentCardLinkListItemLanguage, onRenderItem: exports.onRenderItem, onRenderOverflowButton: function (overflowItems) { return (0, exports.onRenderOverflowButton)(overflowItems, language); } }));
                },
                isPadded: true
            },
            {
                key: "column4",
                name: utils_1.Utility.getStringTranslation4Locale('docListPublished', language),
                fieldName: "datePlublishedValue",
                styles: doclist_1.headerStyle,
                minWidth: 80,
                maxWidth: 80,
                isResizable: false,
                data: "number",
                onRender: function (item) {
                    return React.createElement("span", null, item.lastActivity);
                },
                isPadded: true
            }
        ], false);
    }
    else {
        return tslib_1.__spreadArray(tslib_1.__spreadArray([], commonColumns, true), [
            {
                key: "column3",
                name: utils_1.Utility.getStringTranslation4Locale('docListPublished', language),
                fieldName: "datePlublishedValue",
                styles: doclist_1.headerStyle,
                minWidth: 80,
                maxWidth: 80,
                isResizable: false,
                data: "number",
                onRender: function (item) {
                    return React.createElement("span", null, item.lastActivity);
                },
                isPadded: true
            },
            {
                key: "column4",
                name: utils_1.Utility.getStringTranslation4Locale('docListLanguages', language),
                fieldName: "docLanguages",
                styles: doclist_1.headerStyle,
                minWidth: 70,
                maxWidth: 100,
                isResizable: false,
                data: "string",
                onRender: function (item) {
                    return (React.createElement(react_1.OverflowSet, { "aria-label": utils_1.Utility.getStringTranslation4Locale('LanguageList', language), role: "list", items: item.relatedDocs.map(function (doc) { return ({
                            key: doc.key,
                            name: doc.langCd,
                            link: doc.Url,
                            target: doc.target
                        }); }), className: doclist_1.docListLayoutStyles.documentCardLinkListItemLanguage, onRenderItem: exports.onRenderItem, onRenderOverflowButton: function (overflowItems) { return (0, exports.onRenderOverflowButton)(overflowItems, language); } }));
                },
                isPadded: true
            }
        ], false);
    }
};
exports.getColumns = getColumns;
//# sourceMappingURL=doclist.js.map