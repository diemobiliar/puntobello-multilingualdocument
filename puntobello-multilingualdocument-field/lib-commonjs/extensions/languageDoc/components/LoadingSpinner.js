"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var Spinner_1 = require("@fluentui/react/lib/Spinner");
var LanguageDoc_module_scss_1 = tslib_1.__importDefault(require("./LanguageDoc.module.scss"));
function LoadingSpinner() {
    return (React.createElement(Spinner_1.Spinner, { size: Spinner_1.SpinnerSize.xSmall, className: LanguageDoc_module_scss_1.default.spinner }));
}
exports.default = LoadingSpinner;
//# sourceMappingURL=LoadingSpinner.js.map