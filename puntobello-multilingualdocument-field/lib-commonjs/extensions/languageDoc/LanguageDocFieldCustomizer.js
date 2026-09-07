"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var ReactDOM = tslib_1.__importStar(require("react-dom"));
var decorators_1 = require("@microsoft/decorators");
var sp_listview_extensibility_1 = require("@microsoft/sp-listview-extensibility");
var utils_1 = require("./utils");
var pnpjs_config_1 = require("../../pnpjs-config");
var LanguageDoc_1 = tslib_1.__importDefault(require("./components/LanguageDoc"));
/**
 * LanguageDocFieldCustomizer is a SharePoint Framework (SPFx) field customizer
 * that renders a React component in a list field to display language-specific
 * document information.
 * The content of the cell is rendered in LanguageDoc.tsx and shows if the document has been associated with another document in a different language.
 */
var LanguageDocFieldCustomizer = /** @class */ (function (_super) {
    tslib_1.__extends(LanguageDocFieldCustomizer, _super);
    function LanguageDocFieldCustomizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Initializes the field customizer. Sets up the logger and initializes
     * the PnP JS library for SharePoint data operations.
     *
     * @returns {Promise<void>} A promise that resolves when the initialization is complete.
     */
    LanguageDocFieldCustomizer.prototype.onInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.onInit.call(this)];
                    case 1:
                        _a.sent();
                        this.logger = utils_1.Logger.getInstance();
                        this.logger.setContextInfo(this.context.manifest.alias + " with id " + this.context.manifest.id);
                        this.logger.info('Logger initialized');
                        // PnP initialization
                        (0, pnpjs_config_1.getSP)(this.context);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Renders the React component `LanguageDoc` inside the list field.
     * Retrieves the list item ID and list ID to pass as props to the React component.
     *
     * @param {IFieldCustomizerCellEventParameters} event - The event parameters provided by SPFx.
     */
    LanguageDocFieldCustomizer.prototype.onRenderCell = function (event) {
        var _a, _b;
        var itemid = 0, listid = "";
        itemid = event.listItem.getValueByName("ID");
        listid = (_b = (_a = this.context.pageContext.list) === null || _a === void 0 ? void 0 : _a.id.toString()) !== null && _b !== void 0 ? _b : "";
        var languageDoc = React.createElement(LanguageDoc_1.default, {
            listid: listid,
            itemid: itemid,
            currentUICultureName: this.context.pageContext.cultureInfo.currentUICultureName
        });
        ReactDOM.render(languageDoc, event.domElement);
    };
    /**
     * Disposes of the React component when the cell is no longer needed.
     * Unmounts the React component from the DOM and calls the parent class's dispose method.
     *
     * @param {IFieldCustomizerCellEventParameters} event - The event parameters provided by SPFx.
     */
    LanguageDocFieldCustomizer.prototype.onDisposeCell = function (event) {
        ReactDOM.unmountComponentAtNode(event.domElement);
        _super.prototype.onDisposeCell.call(this, event);
    };
    tslib_1.__decorate([
        decorators_1.override
    ], LanguageDocFieldCustomizer.prototype, "onInit", null);
    tslib_1.__decorate([
        decorators_1.override
    ], LanguageDocFieldCustomizer.prototype, "onRenderCell", null);
    tslib_1.__decorate([
        decorators_1.override
    ], LanguageDocFieldCustomizer.prototype, "onDisposeCell", null);
    return LanguageDocFieldCustomizer;
}(sp_listview_extensibility_1.BaseFieldCustomizer));
exports.default = LanguageDocFieldCustomizer;
//# sourceMappingURL=LanguageDocFieldCustomizer.js.map