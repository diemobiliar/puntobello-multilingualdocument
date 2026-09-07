"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
// React Imports
var React = tslib_1.__importStar(require("react"));
// Fluent UI Components
var Button_1 = require("@fluentui/react/lib/Button");
var react_1 = require("@fluentui/react");
// Custom Styles
var confirmationdialog_1 = require("../styles/confirmationdialog");
// Utility Functions
var utils_1 = require("../utils");
/**
 * ConfirmationDialog component renders a modal dialog with a confirmation message and an OK button.
 * This dialog is used to notify the user of certain events and to confirm their acknowledgment.
 *
 * @param {IConfirmationDialog} props - The properties passed to this component.
 * @param {() => void} props.onClose - Callback function that gets called when the dialog is closed.
 * @param {boolean} props.isOpen - A flag that determines if the modal is open or not.
 * @param {string} props.Title - The title text displayed at the top of the modal.
 * @param {string} props.Message - The message text displayed inside the modal body.
 * @param {string} props.OkBtnLabel - The label text for the confirmation button.
 *
 * @returns {JSX.Element} The rendered ConfirmationDialog component.
 */
function ConfirmationDialog(props) {
    var onClose = props.onClose, isOpen = props.isOpen, Title = props.Title, Message = props.Message, OkBtnLabel = props.OkBtnLabel;
    // Handles the confirmation action by closing the dialog
    var _onConfirmation = function () {
        onClose();
    };
    // Adds a fade-in animation effect when the component mounts
    React.useEffect(function () {
        var styleSheet = document.styleSheets[0];
        styleSheet.insertRule(confirmationdialog_1.fadeInKeyframes, styleSheet.cssRules.length);
    }, []);
    return (React.createElement("div", { style: (0, utils_1.getRootEnv)().css },
        React.createElement(react_1.Modal, { isOpen: true, onDismiss: _onConfirmation, isModeless: false, isBlocking: true, containerClassName: "".concat(confirmationdialog_1.confirmationDialogStyles.container, " ").concat('modalFadeIn') },
            React.createElement("div", { className: confirmationdialog_1.confirmationDialogStyles.header },
                React.createElement("span", null, Title)),
            React.createElement("div", { className: confirmationdialog_1.confirmationDialogStyles.body }, Message),
            React.createElement(Button_1.DefaultButton, { onClick: _onConfirmation, text: OkBtnLabel, className: confirmationdialog_1.confirmationDialogStyles.button }))));
}
exports.default = ConfirmationDialog;
//# sourceMappingURL=ConfirmationDialog.js.map