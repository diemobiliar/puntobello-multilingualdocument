"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var LanguageDoc_module_scss_1 = tslib_1.__importDefault(require("./LanguageDoc.module.scss"));
var pnpjs_config_1 = require("../../../pnpjs-config");
var utils_1 = require("../utils");
var LoadingSpinner_1 = tslib_1.__importDefault(require("./LoadingSpinner"));
var DocumentList_1 = tslib_1.__importDefault(require("./DocumentList"));
var NoDocuments_1 = tslib_1.__importDefault(require("./NoDocuments"));
/**
 * The `LanguageDoc` component is responsible for fetching and displaying language-specific documents
 * based on the provided `listid` and `itemid` properties. It utilizes the PnP SPFx framework to retrieve
 * document data from SharePoint and conditionally renders a loading spinner, a document list, or a "no documents" message
 * based on the state of the data fetching process.
 *
 * @param {ILanguageDoc} props - The properties passed to the component.
 * @param {string} props.listid - The ID of the SharePoint list containing the documents.
 * @param {number} props.itemid - The ID of the list item for which documents are being retrieved.
 * @param {string} props.currentUICultureName - The current UI culture name for localization purposes.
 *
 * @returns {JSX.Element} The rendered component displaying the appropriate content based on the fetched data.
 */
function LanguageDoc(props) {
    var listid = props.listid, itemid = props.itemid, currentUICultureName = props.currentUICultureName;
    // State to track the loading progress of the documents
    var _a = React.useState(true), showProgress = _a[0], setShowProgress = _a[1];
    // State to store the fetched document items
    var _b = React.useState([]), docItems = _b[0], setDocItems = _b[1];
    // Initialize the SharePoint Framework (SPFx) context
    var _sp = (0, pnpjs_config_1.getSP)();
    // Effect hook to fetch documents when the itemid changes
    React.useEffect(function () {
        if (itemid !== 0) {
            (0, utils_1.getLanguageDoc)(_sp, listid, itemid, setDocItems, setShowProgress);
        }
    }, [itemid]);
    return (React.createElement("div", { className: LanguageDoc_module_scss_1.default.LanguageDoc, style: (0, utils_1.getRootEnv)().css }, listid && itemid !== 0 && docItems && docItems.length > 0 ? (showProgress ? (React.createElement(LoadingSpinner_1.default, null)) : (React.createElement(DocumentList_1.default, { docItems: docItems, currentUICultureName: currentUICultureName }))) : (React.createElement(NoDocuments_1.default, { currentUICultureName: currentUICultureName }))));
}
exports.default = LanguageDoc;
//# sourceMappingURL=LanguageDoc.js.map