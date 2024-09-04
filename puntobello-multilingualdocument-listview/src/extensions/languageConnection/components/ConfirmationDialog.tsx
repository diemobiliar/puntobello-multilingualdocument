// React Imports
import * as React from 'react';

// Fluent UI Components
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Modal } from '@fluentui/react';

// Custom Styles
import { confirmationDialogStyles, fadeInKeyframes } from '../styles/confirmationdialog';

// Utility Functions
import { getRootEnv } from '../utils';

// Custom Models
import { IConfirmationDialog } from '../models';

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
export default function ConfirmationDialog(props: IConfirmationDialog) {
    const { onClose, isOpen, Title, Message, OkBtnLabel } = props;

    // Handles the confirmation action by closing the dialog
    const _onConfirmation = () => {
        onClose();
    };

    // Adds a fade-in animation effect when the component mounts
    React.useEffect(() => {
        const styleSheet = document.styleSheets[0];
        styleSheet.insertRule(fadeInKeyframes, styleSheet.cssRules.length);
    }, []);

    return (
        <div style={getRootEnv().css}>
            <Modal
                isOpen={true}  
                onDismiss={_onConfirmation}  
                isModeless={false}  
                isBlocking={true} 
                containerClassName={`${confirmationDialogStyles.container} ${'modalFadeIn'}`}>
                
                {/* Modal Header */}
                <div className={confirmationDialogStyles.header}>
                    <span>{Title}</span>
                </div>
                
                {/* Modal Body */}
                <div className={confirmationDialogStyles.body}>
                    {Message}
                </div>
                
                {/* Confirmation Button */}
                <DefaultButton onClick={_onConfirmation} text={OkBtnLabel} className={confirmationDialogStyles.button} />
            </Modal>
        </div>
    );
}
